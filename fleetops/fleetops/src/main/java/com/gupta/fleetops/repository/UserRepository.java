package com.gupta.fleetops.repository;

import com.gupta.fleetops.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User , UUID> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);

}
