package com.customer.service.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.customer.service.dto.request.CustomerRequest;
import com.customer.service.dto.response.CustomerResponse;
import com.customer.service.dto.response.AccountResponse;
import com.customer.service.entity.Customer;
import com.customer.service.provider.RestTemplateProvider;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    List<CustomerResponse> map(List<Customer> customers);
    @Mapping(target = "id", ignore = true)
    Customer customerRequestToCustomer(CustomerRequest customerRequest);


    default CustomerResponse map(Customer customer) {
        if (customer == null) {
            return null;
        }
        
        List<AccountResponse> customerAccounts = RestTemplateProvider.getCustomerAccounts(customer.getId());

        CustomerResponse customerResponse = CustomerResponse.builder()
                                                        .id(customer.getId())
                                                        .name(customer.getName())
                                                        .email(customer.getEmail())
                                                        .accounts(customerAccounts)
                                                        .build();
        return customerResponse;
    }
}
