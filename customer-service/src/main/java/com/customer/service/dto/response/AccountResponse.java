package com.customer.service.dto.response;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data

public class AccountResponse {
    private Long id;
    private Double balance;
    private String type;
}
