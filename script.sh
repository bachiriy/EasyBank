#!/bin/bash

service_name=$1

mkdir "${service_name}-service"

touch "${service_name}-service/README.md"

echo "# ${service_name} Service" >> "${service_name}-service/README.md"
