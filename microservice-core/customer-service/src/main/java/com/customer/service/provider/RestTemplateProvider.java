package com.customer.service.provider;

import org.springframework.web.client.RestTemplate;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.customer.service.dto.response.AccountResponse;
import com.customer.service.exceptions.GeneralException;


@Component
public class RestTemplateProvider {
    private static RestTemplate rest = new RestTemplate();

    public static List<AccountResponse> getCustomerAccounts(Long customerId){
        String url = "http://mh:8080/api/accounts/customer/" + customerId;

        ParameterizedTypeReference<List<AccountResponse>> resType = new ParameterizedTypeReference<List<AccountResponse>>() {};
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        HttpEntity<List<AccountResponse>> entity = new HttpEntity<List<AccountResponse>>(headers);
        try {
            ResponseEntity<List<AccountResponse>> res = rest.exchange(url, HttpMethod.GET, entity, resType);
            return res.getBody();
        } catch (Exception e) {
            throw new GeneralException(e.getMessage());
        }
        
    }

    public static boolean deleteCustomerAccounts(Long customerId){
        String url = "http://mh:8080/api/accounts/customer/" + customerId;
        try {
            HttpEntity<String> entity = new HttpEntity<String>(new HttpHeaders());
            ResponseEntity<String> resp = rest.exchange(url, HttpMethod.DELETE, entity, String.class);
            if (resp.getStatusCode().equals(HttpStatus.OK)) {
               return true; 
            } else return false;
        } catch (Exception e) {
            throw new GeneralException(e.getMessage());
        }
    }
}

