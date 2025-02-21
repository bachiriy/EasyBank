package com.customer.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.customer.service.dto.response.CustomerResponse;
import com.customer.service.dto.request.CustomerRequest;
import com.customer.service.service.impl.CustomerServiceImpl;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired CustomerServiceImpl customerService;

    // all customers
    @GetMapping
    public List<CustomerResponse> getCustomers(){
        return customerService.getCustomers();
    }

    // add customer
    @PostMapping
    public CustomerResponse addCustomer(CustomerRequest customer){
        return customerService.addCustomer(customer);
    }

    // get customer by id 
    @GetMapping
    public CustomerResponse getCustomerById(@PathVariable long id){
        return customerService.getCustomerById(id);
    }
}
