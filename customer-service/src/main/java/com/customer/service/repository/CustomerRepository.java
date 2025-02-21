package com.customer.service.repository;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.jpa.repository.JpaRepository;
import com.customer.service.entity.Customer;


@Repository
public class CustomerRepository implements JpaRepository<Customer, Long> {
}
