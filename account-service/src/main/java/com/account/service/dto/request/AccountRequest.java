package com.account.service.dto.request;

import com.account.service.entity.enums.AccountType;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class AccountRequest {
    @NotNull(message = "type is required (either CURRENT, SAVINGS)")
    private AccountType type;

    @NotNull(message = "balance is required")
    private Double balance;

    @NotNull(message = "customerId is required")
    private Long customerId; 
}
