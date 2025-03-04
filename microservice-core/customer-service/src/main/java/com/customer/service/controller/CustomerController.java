package com.customer.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.customer.service.dto.response.CustomerResponse;
import com.customer.service.dto.request.CustomerRequest;
import com.customer.service.service.impl.CustomerServiceImpl;
import org.springframework.http.ResponseEntity; 

import jakarta.validation.Valid;

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
    public CustomerResponse addCustomer(@RequestBody @Valid CustomerRequest customer){
        return customerService.addCustomer(customer);
    }

    // get customer by id 
    @GetMapping("/{id}")
    public CustomerResponse getCustomerById(@PathVariable Long id){
        return customerService.getCustomerById(id);
    }

    // update customer
    @PutMapping("/{id}")
    public CustomerResponse updateCustomer(@PathVariable Long id, @RequestBody CustomerRequest customer){
        return customerService.updateCustomer(id, customer);
    }

    // delete customer
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id){
        return customerService.deleteCustomer(id);
    }
}
