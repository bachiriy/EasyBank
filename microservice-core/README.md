# EasyBank - Modern Banking Microservices

A modern banking application built with microservices architecture using Spring Boot and Spring Cloud, allowing management of customers and their banking accounts through REST APIs.

## About EasyBank

EasyBank is a robust, scalable banking system designed to provide seamless banking operations through microservices architecture. The platform enables efficient customer management and account operations while ensuring high availability and fault tolerance.

## Architecture Overview

The application consists of five microservices:

1. **Customer Service**: Manages customer information
2. **Account Service**: Handles account operations and management
3. **Gateway Service**: Acts as an API gateway using Spring Cloud Gateway
4. **Discovery Service**: Service registry and discovery with Eureka
5. **Config Service**: Centralized configuration management connected to Git repository

## Features

### Customer Service
- Create new customers
- List all customers
- Search customers by ID
- Database: Relational database (configurable)

### Account Service
- Create new accounts (Current/Savings)
- View account details
- List customer accounts
- Database: Relational database (configurable)
- Communicates with Customer Service via RestTemplate

## Technical Stack

- **Framework**: Spring Boot
- **Database Access**: Spring Data JPA
- **Service Discovery**: Spring Cloud Netflix Eureka
- **API Gateway**: Spring Cloud Gateway
- **Configuration**: Spring Cloud Config
- **Inter-service Communication**: RestTemplate
- **Testing**: JUnit, Mockito
- **API Testing**: Postman
- **Project Management**: Jira
- **Version Control**: Git

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven
- Git
- Your preferred IDE 
- Postman for API testing

### Installation

1. Clone the repository
```bash
git clone https://github.com/bachiriy/easybank
```

2. Configure your database settings in `application.yml` files

3. Start the services in the following order:
   - Config Service
   - Discovery Service
   - Customer Service
   - Account Service
   - Gateway Service

### Service Ports
- Config Service: 8888
- Discovery Service: 8761
- Customer Service: 8081
- Account Service: 8082
- Gateway Service: 8889

## API Documentation

### Customer Service Endpoints

```
POST /api/customers - Create a new customer
GET /api/customers - Get all customers
GET /api/customers/{id} - Get customer by ID
```

### Account Service Endpoints

```
POST /api/accounts - Create a new account
GET /api/accounts/{id} - Get account by ID
GET /api/accounts/customer/{customerId} - Get all accounts for a customer
```

## Project Structure

```
easybank-microservices/
├── config-service/
├── discovery-service/
├── gateway-service/
├── customer-service/
│   ├── src/main/java/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── entities/
│   │   └── dto/
│   └── src/test/java/
└── account-service/
    ├── src/main/java/
    │   ├── controllers/
    │   ├── services/
    │   ├── repositories/
    │   ├── entities/
    │   └── dto/
    └── src/test/java/
```

## Testing

- Unit tests are implemented using JUnit and Mockito
- API testing can be performed using the provided Postman collection
- Run tests using Maven:
```bash
mvn test
```

## UML Diagrams

-  UML Diagrams (Use Case and Class Diagram): [Link to diagrams](https://lucid.app/lucidchart/8f822acf-bce7-4586-b07d-9d7d5bae6602/edit?page=0_0&invitationId=inv_2e888661-24c7-4a1a-89d5-13bb0debafbf#)

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## Development Timeline

- Start Date: 17/02/2025
- End Date: 21/02/2025

## Performance Criteria

- Implementation of all specified customer and account management functionalities
- Reliable inter-service communication with proper error handling
- Operational service discovery via Eureka
- Proper implementation of layered architecture with design patterns
- Comprehensive unit test coverage
- Clean, documented code following Java best practices
- Centralized configuration properly synchronized with Git repository
- Version control with Git and Agile project management

## Future Enhancements

- Implementation of security microservice with stateless authentication
- Addition of transaction management
- Implementation of notification service
- Performance monitoring and logging

## Contact

[My Email](mailto:el.bachiri.mohammed@student.youcode.ma)

