package com.customer.service.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CustomerRequest {
    @NotBlank(message = "name is required")
    private String name;
    @NotBlank(message = "email is required")
    private String email;
}
