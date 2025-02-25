package com.account.service.service;

import java.util.List;
import com.account.service.dto.request.AccountRequest;
import com.account.service.dto.response.AccountResponse;

public interface AccountService {
    List<AccountResponse> getAccounts();
    AccountResponse addAccount(AccountRequest account);
    AccountResponse getAccountById(Long id);
    List<AccountResponse> getCustomerAccounts(Long customerId);
}

