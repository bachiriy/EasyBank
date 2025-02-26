package com.account.service.dto.response;

import lombok.*;

import com.account.service.entity.enums.AccountType;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class AccountResponse {
    private Long id; 
    private Double balance;
    private AccountType type;
    private Long customerId;
}
