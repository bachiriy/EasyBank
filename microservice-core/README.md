# EasyBank - Microservice Core

## Overview

EasyBank Microservice Core is a modern banking application backend built on a microservices architecture using Spring Boot and Spring Cloud. This system provides robust API endpoints for managing bank customers and accounts with high scalability, maintainability, and performance.

## Microservices Architecture

![Microservices Architecture Diagram]

The application is composed of the following microservices:

1. **Customer Service**: Manages customer information
2. **Account Service**: Handles accounts and their operations
3. **Gateway Service**: Serves as a single entry point for all API requests
4. **Discovery Service**: Provides service registration and discovery via Eureka
5. **Config Service**: Manages centralized configuration from a Git repository

## Features

### Customer Service
- Add new customers
- List all customers
- Find a customer by ID

### Account Service
- Create new accounts (Current or Savings)
- Retrieve account details
- List all accounts for a customer
- Communication with Customer Service to validate customer data

### Gateway Service
- Route API requests to appropriate microservices
- Load balancing
- Request filtering and transformation

### Discovery Service
- Service registration
- Service discovery
- Health monitoring

### Config Service
- Centralized configuration management
- Dynamic property updates
- Environment-specific configurations

## Tech Stack

- **Java 17**
- **Spring Boot 3.x**: For building microservices
- **Spring Data JPA**: For database operations
- **Spring Cloud**:
  - Eureka: For service discovery
  - Gateway: For API gateway
  - Config: For centralized configuration
- **RestTemplate**: For inter-service communication
- **PostgreSQL**: Relational database for persistent storage
- **Maven**: For dependency management and build
- **Docker**: For containerization
- **JUnit & Mockito**: For testing

## Project Structure

```
easybank-microservice-core/
├── customer-service/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/easybank/customer/
│   │   │   │   ├── controller/
│   │   │   │   ├── service/
│   │   │   │   ├── repository/
│   │   │   │   ├── entity/
│   │   │   │   ├── dto/
│   │   │   │   ├── mapper/
│   │   │   │   └── exceptions/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── account-service/
│   ├── src/
│   │   ├── main/...
│   │   └── test/...
│   └── pom.xml
├── gateway-service/
│   ├── src/...
│   └── pom.xml
├── discovery-service/
│   ├── src/...
│   └── pom.xml
├── config-service/
│   ├── src/...
│   └── pom.xml
└── pom.xml
```

## Getting Started

### Prerequisites

- Java 17
- Maven
- Git
- Docker (optional)
- PostgreSQL (or any relational database)

### Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/bachiriy/EasyBank
   cd EasyBank/microservice-core
   ```

2. Set up the configuration repository:
   ```
   cd configurations
   git init
   git add .
   git commit -m "Initial configuration"
   ```

3. Update the `config-service/src/main/resources/application.yml` to point to your config repository.

4. Start the services in the following order:
   ```
   # Build all services
   mvn clean package
   
   # Start services in order
   cd config-service
   mvn spring-boot:run
   
   cd ../discovery-service
   mvn spring-boot:run
   
   cd ../customer-service
   mvn spring-boot:run
   
   cd ../account-service
   mvn spring-boot:run
   
   cd ../gateway-service
   mvn spring-boot:run
   ```

### Docker Deployment

A `docker-compose.yml` file is provided for easy deployment:

```
docker-compose up -d
```

### API Documentation

Once the services are running, access the Swagger documentation:

- Customer Service: http://localhost:8081/swagger-ui.html
- Account Service: http://localhost:8082/swagger-ui.html
- Gateway API: http://localhost:8888/swagger-ui.html

## Development Guidelines

### Architecture Pattern

Follow clean architecture principles:
- Controllers handle HTTP requests and responses
- Services contain business logic
- Repositories interact with the database
- DTOs for data transfer between layers
- Mappers for entity-DTO conversions

### Database Design

- Each service has its own database schema
- Use JPA entities with proper relationships
- Implement database migrations with Flyway

### Error Handling

- Use global exception handlers
- Return appropriate HTTP status codes
- Provide meaningful error messages

### Testing

- Write unit tests for services and repositories
- Implement integration tests for API endpoints
- Aim for at least 80% code coverage

## Monitoring and Management

- Actuator endpoints for monitoring service health
- Eureka dashboard for service status visualization
- Spring Boot Admin for application monitoring

## Security (Bonus)

- JWT-based authentication
- Role-based authorization
- Secure API endpoints with Spring Security

## CI/CD Pipeline

- GitHub Actions workflow for continuous integration
- Automated testing
- Docker image building and publishing

## Future Improvements

- [ ] Add transaction service for money transfers
- [ ] Implement Circuit Breaker pattern with Resilience4j
- [ ] Set up distributed tracing with Spring Cloud Sleuth and Zipkin
- [ ] Add API rate limiting
- [ ] Implement event-driven architecture with Kafka

## License

This project is licensed under the MIT License.
