package com.account.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;

// import com.customer.service.dto.response.AccountResponse;
// import com.customer.service.dto.request.AccountRequest;
// import com.customer.service.service.impl.AccountServiceImpl;


@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    // @Autowired AccountServiceImpl customerService;

    // all customers
    @GetMapping
    // public List<AccountResponse> getAccounts(){
    public String getAccounts(){
        // return customerService.getAccounts();
        return "accounts";
    }

    // add customer
    // @PostMapping
    // public AccountResponse addAccount(@RequestBody @Valid AccountRequest customer){
    //     return customerService.addAccount(customer);
    // }

    // get customer by id 
    // @GetMapping("/{id}")
    // public AccountResponse getAccountById(@PathVariable Long id){
    //     return customerService.getAccountById(id);
    // }
}
