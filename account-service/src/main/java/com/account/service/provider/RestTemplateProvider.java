package com.account.service.provider;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.account.service.dto.response.CustomerResponse;
import com.account.service.exceptions.ResourceNotFoundException;

@Component
public class RestTemplateProvider {
    private static RestTemplate rest = new RestTemplate();

    public static CustomerResponse getCustomer(Long customerId){
        String url = "http://mh:8080/api/customers/" + customerId;

        ResponseEntity<CustomerResponse> res = rest.getForEntity(url, CustomerResponse.class);
        HttpStatusCode resCode = res.getStatusCode();
        
        if (resCode.equals(HttpStatus.OK)) {
           return res.getBody(); 
        } else if (resCode.equals(HttpStatus.NOT_FOUND)) {
            throw new ResourceNotFoundException("Customer with this ID was NOT FOUND.");
        } else return null;
    }
}
