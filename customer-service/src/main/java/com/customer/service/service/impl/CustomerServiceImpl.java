package com.customer.service.service.impl;

import com.customer.service.service.CustomerService;
import java.util.List;
import com.customer.service.dto.*;

public class CustomerServiceImpl implements CustomerService {
    @AutoWired CustomerRepository customerRepository;

    public List<CustomerResponse> getCustomers(){
        // TODO: mapping
        return customerRepository.findAll();
    }
    public CustomerResponse addCustomer(CustomerRequest customer){
        // TODO: mapping
        return customerRepository.save(customer);
    }
    public CustomerResponse getCustomerById(long id){
        // TODO: mapping
        return customerRepository.findById(id);
    }
}
