package com.customer.service.service;

import java.util.List;
import com.customer.service.dto.request.CustomerRequest;
import com.customer.service.dto.response.CustomerResponse;

public interface CustomerService {
   List<CustomerResponse> getCustomers();
   CustomerResponse addCustomer(CustomerRequest customer);
   CustomerResponse getCustomerById(Long id);
}

