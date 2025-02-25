package com.account.service.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import com.account.service.dto.request.AccountRequest;
import com.account.service.dto.response.AccountResponse;
import com.account.service.dto.response.CustomerResponse;
import com.account.service.entity.Account;
import com.account.service.provider.RestTemplateProvider;


@Mapper(componentModel = "spring")
public interface AccountMapper {
    
    List<AccountResponse> map(List<Account> accounts);
    Account accountRequestToAccount(AccountRequest accountRequest);


    default AccountResponse map(Account account) {
        if (account == null) return null;

        CustomerResponse accountCustomer = RestTemplateProvider.getCustomer(account.getCustomerId()); // will fail if customer does not exists.

        return AccountResponse.builder()
                              .id(account.getId())
                              .balance(account.getBalance())
                              .type(account.getType())
                              .customer(accountCustomer)
                              .build();
    }


//    default CustomerAccountsResponse mapCustomerAccounts(CustomerResponse customer, List<Account> accounts){
//        if (customer == null) return null;
//
//        return CustomerAccountsResponse.builder() 
//                                       .customer(customer)
//                                       .accounts(this.map(accounts))
//                                       .build(); 
//    }   
}
