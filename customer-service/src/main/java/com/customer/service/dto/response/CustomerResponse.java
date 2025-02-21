package com.customer.service.dto.response;

import lombok.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CustomerResponse {
    private String name;
    private String email;
    private List<String> accounts; 
}
