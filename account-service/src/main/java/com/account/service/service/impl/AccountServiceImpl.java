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


@Service
public class AccountServiceImpl implements AccountService {
    @Autowired AccountRepository accountRepository;
    @Autowired AccountMapper accountMapper;

    public List<AccountResponse> getAccounts(){
        return accountMapper.map(this.accountRepository.findAll());
    }


    public AccountResponse addAccount(AccountRequest account){
        if (!this.accountRepository.existsByCustomerIdAndType(account.getCustomerId(), account.getType())) {
            RestTemplateProvider.getCustomer(account.getCustomerId()); // will fail if customer does not exists.
            Account accountToSave = accountMapper.accountRequestToAccount(account);
            return accountMapper.map(this.accountRepository.save(accountToSave));
        } else throw new ResourceAlreadyExistsException("Account already exists, Customer can not have more than two different accounts.");
    }


    public AccountResponse getAccountById(Long id){
        Optional<Account> accountFound = this.accountRepository.findById(id);

        if (accountFound.isPresent()) {
            return this.accountMapper.map(accountFound.get());
        } else throw new ResourceNotFoundException("Account with this ID does not exists.");
    }

    public List<AccountResponse> getCustomerAccounts(Long customerId){
        if (customerId == null) throw new ResourceNotFoundException("Customer ID is NULL.");

        List<Account> customerAccounts = this.accountRepository.findAllByCustomerId(customerId); 

        if (customerAccounts != null) {
            RestTemplateProvider.getCustomer(customerId); // will fail if customer does not exists.
            return this.accountMapper.map(customerAccounts); 
        } else throw new ResourceNotFoundException("Customer with this ID has no accounts.");

    }
}
