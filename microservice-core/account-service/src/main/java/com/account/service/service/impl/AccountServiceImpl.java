package com.account.service.service.impl;

import com.account.service.service.AccountService;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.account.service.dto.request.AccountRequest;
import com.account.service.dto.response.AccountResponse;
import com.account.service.entity.Account;
import com.account.service.exceptions.ResourceAlreadyExistsException;
import com.account.service.exceptions.ResourceNotFoundException;
import com.account.service.repository.AccountRepository;
import com.account.service.mapper.AccountMapper;
import com.account.service.provider.RestTemplateProvider;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@Service
public class AccountServiceImpl implements AccountService {
    @Autowired AccountRepository accountRepository;
    @Autowired AccountMapper accountMapper;

    public List<AccountResponse> getAccounts(){
        return accountMapper.map(this.accountRepository.findAll());
    }


    public AccountResponse addAccount(AccountRequest account){
        if (!this.accountRepository.existsByCustomerIdAndType(account.getCustomerId(), account.getType())) {
            if (!RestTemplateProvider.customerExistsById(account.getCustomerId())) {
                throw new ResourceNotFoundException("Customer with this ID does not exists");
                // return null;
            } else {
                Account accountToSave = accountMapper.accountRequestToAccount(account);
                return accountMapper.map(this.accountRepository.save(accountToSave));
            }
        } else throw new ResourceAlreadyExistsException("Account already exists, Customer can not have more than two different accounts.");
    }


    public AccountResponse getAccountById(Long id){
        Optional<Account> accountFound = this.accountRepository.findById(id);

        if (accountFound.isPresent()) {
            return this.accountMapper.map(accountFound.get());
        } else throw new ResourceNotFoundException("Account with this ID does not exists.");
    }

    public List<AccountResponse> getCustomerAccounts(Long customerId){
        if (customerId == null) {
            throw new ResourceNotFoundException("Customer ID is NULL.");
        }
        return this.accountMapper.map(this.accountRepository.findAllByCustomerId(customerId)); 
    }

    public ResponseEntity<String> deleteCustomerAccounts(Long customerId){
        if (customerId == null) {
            throw new ResourceNotFoundException("Customer ID is NULL.");
        }
        try {
            this.accountRepository.deleteCustomerAccountsByCustomerId(customerId);
            return new ResponseEntity<String>("Customer accounts deleted with success.", HttpStatus.OK); 
        } catch (Exception e) {
            return new ResponseEntity<String>("Failed deleting customer accounts. ERROR: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
   }
}
