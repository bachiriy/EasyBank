package com.customer.service.service.impl;

import com.customer.service.service.CustomerService;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customer.service.dto.request.CustomerRequest;
import com.customer.service.dto.response.CustomerResponse;
import com.customer.service.entity.Customer;
import com.customer.service.exceptions.ResourceAlreadyExistsException;
import com.customer.service.exceptions.ResourceNotFoundException;
import com.customer.service.repository.CustomerRepository;
import com.customer.service.mapper.CustomerMapper;


@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired CustomerRepository customerRepository;
    @Autowired CustomerMapper customerMapper;

    public List<CustomerResponse> getCustomers(){
        return customerMapper.map(customerRepository.findAll());
    }
    public CustomerResponse addCustomer(CustomerRequest customer){
        if (!customerRepository.existsByNameAndEmail(customer.getName(), customer.getEmail())) {
            Customer customerToSave = customerMapper.customerRequestToCustomer(customer);
            return customerMapper.map(customerRepository.save(customerToSave));
        } else throw new ResourceAlreadyExistsException("Customer with this informations already exists.");
    }
    public CustomerResponse getCustomerById(Long id){
        Optional<Customer> customerFound = this.customerRepository.findById(id);
        if (customerFound.isPresent()) {
            return this.customerMapper.map(customerFound.get());
        } else throw new ResourceNotFoundException("Customer with this ID does not exists."); 
    }
}
