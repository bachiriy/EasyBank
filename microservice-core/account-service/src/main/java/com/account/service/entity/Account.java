package com.account.service.entity;

import com.account.service.entity.enums.AccountType;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; 
    private Double balance;
    private AccountType type;
    private Long customerId; 
}
