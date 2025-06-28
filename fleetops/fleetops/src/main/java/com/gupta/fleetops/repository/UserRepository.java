package com.gupta.fleetops.repository;

import com.gupta.fleetops.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserInfo , UUID> {
    Optional<UserInfo> findByEmail(String email);
    Optional<UserInfo> findByUsername(String username);

}
