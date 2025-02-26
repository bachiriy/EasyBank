package com.customer.service.dto.response;

import lombok.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CustomerResponse {
    private Long id;
    private String name;
    private String email;
    private List<AccountResponse> accounts; 
}
