package com.account.service.dto.response;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CustomerResponse {
    private Long id;
    private String name;
    private String email;
}
