package com.account.service.service;

import java.util.List;
import com.account.service.dto.request.AccountRequest;
import com.account.service.dto.response.AccountResponse;
import org.springframework.http.ResponseEntity;

public interface AccountService {
    List<AccountResponse> getAccounts();
    AccountResponse addAccount(AccountRequest account);
    AccountResponse getAccountById(Long id);
    List<AccountResponse> getCustomerAccounts(Long customerId);
    ResponseEntity<String> deleteCustomerAccounts(Long customerId);
}

