# EasyBank - Full-Stack Banking Application

## Overview
EasyBank is a modern banking application built with a microservices architecture. It provides a complete solution for managing bank customers and their accounts (current and savings accounts) through a responsive web interface backed by scalable microservices.

## Architecture
- **Frontend**: React.js + TypeScript Single Page Application
- **Backend**: Spring Boot microservices architecture
  - Customer Service: Manages customer data
  - Account Service: Handles bank accounts
  - Gateway Service: API gateway (entry point)
  - Discovery Service: Service registry (Eureka)
  - Config Service: Centralized configuration

## Key Features
- Customer management (create, view, search)
- Account management (create, view accounts by customer)
- Responsive dashboard
- Microservices communication
- RESTful API endpoints

## Tech Stack
- **Frontend**: React.js, TypeScript, Material-UI, Axios
- **Backend**: Java 17, Spring Boot 3.x, Spring Cloud, JPA
- **Databases**: PostgreSQL, MySql and H2
- **Tools**: Maven, Git, Docker, UML

## Quick Start
1. Clone the repository
2. Start the whole application by running the following script: 
```bash
./run.sh
```
4. Access the application at http://localhost:3000

## Documentation
- Take a look at backend services (see [Backend README](./microservice-core/README.md))
- Take a look at frontend application (see [Frontend README](./web-client/README.md))
- configurations [Configurations Documentation](./configurations/README.md)

## Project Management
- [Jira Board](https://mohammedelbachiri945.atlassian.net/jira/software/projects/EAS/boards/334/backlog)

## License
This project is licensed under the MIT License.


## Contact 
- [Get In Touch With The Author](mailto:el.bachiri.mohammed@student.youcode.ma)
