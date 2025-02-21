package com.customer.service.mapper;

import java.util.Arrays;
import java.util.List;

import org.mapstruct.Mapper;

import com.customer.service.dto.request.CustomerRequest;
import com.customer.service.dto.response.CustomerResponse;
import com.customer.service.entity.Customer;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    List<CustomerResponse> map(List<Customer> customers);
    Customer customerRequestToCustomer(CustomerRequest customerRequest);


    default CustomerResponse map(Customer customer) {
        if (customer == null) {
            return null;
        }
        // TODO: Fetch customer accounts from account-service
        List<String> customerAccounts = Arrays.asList("first account (CVA)", "second accout (compte d'épargne)");

        CustomerResponse customerResponse = CustomerResponse.builder()
                                                        .id(customer.getId())
                                                        .name(customer.getName())
                                                        .email(customer.getEmail())
                                                        .accounts(customerAccounts)
                                                        .build();
        return customerResponse;
    }
}
