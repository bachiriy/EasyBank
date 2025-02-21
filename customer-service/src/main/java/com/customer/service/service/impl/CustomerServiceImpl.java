package com.customer.service.service.impl;

import com.customer.service.service.CustomerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.customer.service.dto.request.CustomerRequest;
import com.customer.service.dto.response.CustomerResponse;
import com.customer.service.repository.CustomerRepository;

public class CustomerServiceImpl implements CustomerService {
    @Autowired CustomerRepository customerRepository;

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
