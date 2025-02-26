package com.account.service.provider;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.account.service.dto.response.CustomerResponse;
import com.account.service.exceptions.GeneralException;

@Component
public class RestTemplateProvider {
    private static RestTemplate rest = new RestTemplate();

    public static boolean customerExistsById(Long customerId){
        String url = "http://mh:8080/api/customers/" + customerId;
        
        try {
            ResponseEntity<CustomerResponse> res = rest.getForEntity(url, CustomerResponse.class);
            if (res.getStatusCode().equals(HttpStatus.OK)) {
                return true; 
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new GeneralException(e.getMessage());
        }
    }
}
