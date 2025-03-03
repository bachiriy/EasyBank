#!/bin/bash

# Create a directory for log files if it doesn't exist
mkdir -p logs

# Colors for better readability
GREEN="\033[0;32m"
RED="\033[0;31m"
YELLOW="\033[0;33m"
NC="\033[0m" # No Color

# Store the root directory path
ROOT_DIR=$(pwd)

# Function to check if a service is running by making a GET request
check_service_running() {
    local url=$1
    local service_name=$2
    local max_attempts=$3
    local attempt=1
    
    echo -e "${YELLOW}Checking if $service_name is running...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        echo "Attempt $attempt/$max_attempts: Checking $url"
        
        # Use curl with timeout to check if the service is responding
        if curl -s -f --max-time 5 "$url" > /dev/null; then
            echo -e "${GREEN}$service_name is UP and RUNNING!${NC}"
            return 0
        else
            echo "Service not ready yet. Waiting..."
            sleep 10
            attempt=$((attempt + 1))
        fi
    done
    
    echo -e "${RED}ERROR: $service_name did not start properly after $max_attempts attempts!${NC}"
    echo "Check $ROOT_DIR/logs/$service_name.log for details"
    return 1
}

# Function to start a service
start_service() {
    local service_dir=$1
    local service_name=$2
    local check_url=$3
    local check_attempts=${4:-12}  # Default to 12 attempts (2 minutes with 10-second intervals)
    
    echo -e "${YELLOW}Starting $service_name...${NC}"
    cd "$ROOT_DIR/microservice-core/$service_dir" || { 
        echo -e "${RED}Directory $service_dir not found!${NC}"; 
        return 1; 
    }
    
    # Clean and build the service
    echo "Building $service_name..."
    mvn clean package -DskipTests > "$ROOT_DIR/logs/$service_name-build.log" 2>&1
    
    # Start the service in the background
    echo "Running $service_name..."
    nohup mvn spring-boot:run > "$ROOT_DIR/logs/$service_name.log" 2>&1 &
    
    # Save the PID of the service
    echo $! > "$ROOT_DIR/logs/$service_name.pid"
    
    echo "$service_name started with PID $(cat "$ROOT_DIR/logs/$service_name.pid")"
    
    # Return to root directory
    cd "$ROOT_DIR"
    
    # Check if the service is up and running
    check_service_running "$check_url" "$service_name" "$check_attempts"
    return $?
}

# Create a stop script
cat > "$ROOT_DIR/stop.sh" << 'EOF'
#!/bin/bash
echo "Stopping all services..."

for pid_file in logs/*.pid; do
    if [ -f "$pid_file" ]; then
        service_name=$(basename "$pid_file" .pid)
        pid=$(cat "$pid_file")
        echo "Stopping $service_name (PID: $pid)"
        kill -15 $pid 2>/dev/null || echo "Process $pid not found"
        rm "$pid_file"
    fi
done

echo "All services stopped"
EOF

chmod +x "$ROOT_DIR/stop.sh"

# Start all services in the correct order
# 1. Start Discovery Service (Eureka)
echo -e "${YELLOW}=== Starting Discovery Service (Eureka) ===${NC}"
start_service "discovery-service" "discovery" "http://localhost:8761/" 15
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to start Discovery Service. Stopping all services.${NC}"
    "$ROOT_DIR/stop.sh"
    exit 1
fi

# 2. Start Config Service
echo -e "${YELLOW}=== Starting Config Service ===${NC}"
start_service "config-service" "config" "http://localhost:8888/actuator/health" 12
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to start Config Service. Stopping all services.${NC}"
    "$ROOT_DIR/stop.sh"
    exit 1
fi

# 3. Start Gateway Service
echo -e "${YELLOW}=== Starting Gateway Service ===${NC}"
start_service "gateway-service" "gateway" "http://localhost:8080/actuator/health" 12
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to start Gateway Service. Stopping all services.${NC}"
    "$ROOT_DIR/stop.sh"
    exit 1
fi

# 4. Start Customer Service
echo -e "${YELLOW}=== Starting Customer Service ===${NC}"
start_service "customer-service" "customer" "http://localhost:8081/actuator/health" 12
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to start Customer Service. Stopping all services.${NC}"
    "$ROOT_DIR/stop.sh"
    exit 1
fi

# 5. Check if Customer Service is registered with Eureka
echo -e "${YELLOW}Checking if Customer Service is registered with Eureka...${NC}"
for i in {1..12}; do
    if curl -s "http://localhost:8761/eureka/apps/CUSTOMER-SERVICE" | grep -q "CUSTOMER-SERVICE"; then
        echo -e "${GREEN}Customer Service is registered with Eureka!${NC}"
        break
    fi
    echo "Waiting for Customer Service to register with Eureka... Attempt $i/12"
    sleep 10
    if [ $i -eq 12 ]; then
        echo -e "${RED}WARNING: Customer Service might not be registered with Eureka properly.${NC}"
    fi
done

# 6. Start Account Service
echo -e "${YELLOW}=== Starting Account Service ===${NC}"
start_service "account-service" "account" "http://localhost:8082/actuator/health" 12
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to start Account Service. Stopping all services.${NC}"
    "$ROOT_DIR/stop.sh"
    exit 1
fi

# 7. Check if Account Service is registered with Eureka
echo -e "${YELLOW}Checking if Account Service is registered with Eureka...${NC}"
for i in {1..12}; do
    if curl -s "http://localhost:8761/eureka/apps/ACCOUNT-SERVICE" | grep -q "ACCOUNT-SERVICE"; then
        echo -e "${GREEN}Account Service is registered with Eureka!${NC}"
        break
    fi
    echo "Waiting for Account Service to register with Eureka... Attempt $i/12"
    sleep 10
    if [ $i -eq 12 ]; then
        echo -e "${RED}WARNING: Account Service might not be registered with Eureka properly.${NC}"
    fi
done

# Start the React frontend
echo -e "${YELLOW}=== Starting React Frontend ===${NC}"
cd "$ROOT_DIR/web-client/app" || { 
    echo -e "${RED}web-client directory not found!${NC}"; 
    exit 1; 
}

nohup npm start > "$ROOT_DIR/logs/frontend.log" 2>&1 &
echo $! > "$ROOT_DIR/logs/frontend.pid"
cd "$ROOT_DIR"

# Check if React frontend is running
echo -e "${YELLOW}Waiting for React frontend to start...${NC}"
for i in {1..12}; do
    if curl -s -f --max-time 5 http://localhost:3000 > /dev/null; then
        echo -e "${GREEN}React frontend is UP on port 3000!${NC}"
        break
    fi
    echo "Waiting for React frontend... Attempt $i/12"
    sleep 10
    if [ $i -eq 12 ]; then
        echo -e "${RED}WARNING: React frontend might not have started properly. Check logs/frontend.log${NC}"
    fi
done

echo -e "${GREEN}=====================================================================================${NC}"
echo -e "${GREEN}All services started successfully! Access points:${NC}"
echo "- Eureka Dashboard: http://localhost:8761"
echo "- Config Service: http://localhost:8888"
echo "- API Gateway: http://localhost:8080"
echo "- Customer Service: http://localhost:8081"
echo "- Account Service: http://localhost:8082"
echo "- React Frontend: http://localhost:3000"
echo -e "${GREEN}=====================================================================================${NC}"
echo "To stop all services, run: ./stop.sh"
echo "To check logs: tail -f logs/[service-name].log"
