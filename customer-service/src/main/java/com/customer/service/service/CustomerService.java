package com.customer.service.service;

import java.util.List;
import com.customer.service.dto.*;

public interface CustomerService {
   List<CustomerResponse> getCustomers();
   CustomerResponse addCustomer(CustomerRequest customer);
   CustomerResponse getCustomerById(long id);
}

