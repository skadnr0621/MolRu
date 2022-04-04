package com.bmb.molru.repository;

import com.bmb.molru.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByAddress(String address);
}
