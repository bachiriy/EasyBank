package com.account.service.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import com.account.service.dto.request.AccountRequest;
import com.account.service.dto.response.AccountResponse;
import com.account.service.entity.Account;


@Mapper(componentModel = "spring")
public interface AccountMapper {
    
    List<AccountResponse> map(List<Account> accounts);
    Account accountRequestToAccount(AccountRequest accountRequest);


    default AccountResponse map(Account account) {
        if (account == null) return null;

        return AccountResponse.builder()
                              .id(account.getId())
                              .balance(account.getBalance())
                              .type(account.getType())
                              .customerId(account.getCustomerId())
                              .build();
    }
}
