package com.gupta.fleetops.repository;


import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompanyRepository extends JpaRepository<Company, UUID> {
//    Optional<Company> findByIdAndUserId(UUID companyId, UUID userId);










}
