package com.customer.service;

import com.customer.service.dto.request.CustomerRequest;
import com.customer.service.dto.response.CustomerResponse;
import com.customer.service.exceptions.ResourceNotFoundException;
import com.customer.service.mapper.CustomerMapper;
import com.customer.service.entity.Customer;
import com.customer.service.repository.CustomerRepository;
import com.customer.service.service.impl.CustomerServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CustomerServiceImplTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CustomerMapper customerMapper;

    @InjectMocks
    private CustomerServiceImpl customerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddCustomer() {
        // Arrange
        CustomerRequest customerRequest = new CustomerRequest();
        customerRequest.setName("John Doe");
        customerRequest.setEmail("john.doe@example.com");

        Customer customer = new Customer();
        customer.setId(1L);
        customer.setName("John Doe");
        customer.setEmail("john.doe@example.com");

        CustomerResponse expectedResponse = new CustomerResponse();
        expectedResponse.setId(1L);
        expectedResponse.setName("John Doe");
        expectedResponse.setEmail("john.doe@example.com");

        when(customerMapper.customerRequestToCustomer(any(CustomerRequest.class))).thenReturn(customer);
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);
        when(customerMapper.map(any(Customer.class))).thenReturn(expectedResponse);

        // Act
        CustomerResponse actualResponse = customerService.addCustomer(customerRequest);

        // Assert
        assertEquals(expectedResponse.getId(), actualResponse.getId());
        assertEquals(expectedResponse.getName(), actualResponse.getName());
        assertEquals(expectedResponse.getEmail(), actualResponse.getEmail());

        verify(customerMapper, times(1)).customerRequestToCustomer(any(CustomerRequest.class));
        verify(customerRepository, times(1)).save(any(Customer.class));
        verify(customerMapper, times(1)).map(any(Customer.class));
    }

    @Test
    void testDeleteCustomer() {
        // Arrange
        Long customerId = 1L;
        when(customerRepository.existsById(customerId)).thenReturn(true);
        doNothing().when(customerRepository).deleteById(customerId);

        // Act
        ResponseEntity<String> response = customerService.deleteCustomer(customerId);

        // Assert
        assertEquals("Customer was deleted with success", response.getBody());
        assertEquals(200, response.getStatusCodeValue());

        verify(customerRepository, times(1)).existsById(customerId);
        verify(customerRepository, times(1)).deleteById(customerId);
    }

    @Test
    void testDeleteCustomer_NotFound() {
        // Arrange
        Long customerId = 1L;
        when(customerRepository.existsById(customerId)).thenReturn(false);

        // Act and Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            customerService.deleteCustomer(customerId);
        });

        assertEquals("Customer with this ID does not exists.", exception.getMessage());

        verify(customerRepository, times(1)).existsById(customerId);
        verify(customerRepository, times(0)).deleteById(customerId);
    }
}