package com.account.service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.account.service.entity.Account;
import com.account.service.entity.enums.AccountType;


@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByCustomerIdAndType(Long customerId, AccountType type);
    List<Account> findAllByCustomerId(Long customerId);
}
