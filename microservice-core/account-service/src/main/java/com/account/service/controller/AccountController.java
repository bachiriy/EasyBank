package com.account.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;

import com.account.service.dto.response.AccountResponse;
import com.account.service.dto.request.AccountRequest;
import com.account.service.service.impl.AccountServiceImpl;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    @Autowired AccountServiceImpl accountService;

    // all accounts 
    @GetMapping
    public List<AccountResponse> getAccounts(){
        return this.accountService.getAccounts();
    }

    // add accounts 
    @PostMapping
    public AccountResponse addAccount(@RequestBody @Valid AccountRequest account){
        return this.accountService.addAccount(account);
    }

    // get account by id  
    @GetMapping("/{id}")
    public AccountResponse getAccountById(@PathVariable Long id){
        return this.accountService.getAccountById(id);
    }


    // get customer accounts by customerId  
    @GetMapping("/customer/{customerId}")
    public List<AccountResponse> getCustomerAccounts(@PathVariable Long customerId){
        return this.accountService.getCustomerAccounts(customerId);
    }

    // delete customer accounts by customerId  
    @DeleteMapping("/customer/{customerId}")
    public ResponseEntity<String> deleteCustomerAccounts(@PathVariable Long customerId){
        return this.accountService.deleteCustomerAccounts(customerId);
    }
}
