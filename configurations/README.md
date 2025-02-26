# EasyBank - Configuration

## Overview
This repository contains configuration files for the EasyBank microservices.

## Structure
```
config/
├── customer-service.yml  # Customer service specific configs
├── account-service.yml   # Account service specific configs
```

## Usage
- Config Server connects to this repository
- Services retrieve their configurations at startup
- Supports dynamic configuration updates

## Setup
1. Clone this repository
2. Update the Config Server application.yml to point to this repo:
   ```yaml
   spring:
     cloud:
       config:
         server:
           git:
             uri: file:///${user.home}/path/to/config-repo
             default-label: main
   ```

## Configuration Properties
Each YAML file contains service-specific properties including:
- Port numbers
- Database connections
- Service discovery settings
- Feature toggles
