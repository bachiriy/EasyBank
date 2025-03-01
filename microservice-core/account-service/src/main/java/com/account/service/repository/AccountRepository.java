package com.account.service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.account.service.entity.Account;
import com.account.service.entity.enums.AccountType;

import jakarta.transaction.Transactional;


@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByCustomerIdAndType(Long customerId, AccountType type);
    List<Account> findAllByCustomerId(Long customerId);

    @Modifying
    @Transactional
    @Query("delete from Account where customerId = :customerId")
    void deleteCustomerAccountsByCustomerId(Long customerId); 
}
