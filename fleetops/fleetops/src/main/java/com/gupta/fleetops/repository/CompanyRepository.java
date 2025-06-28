package com.gupta.fleetops.repository;


import com.gupta.fleetops.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;

@RestController
public interface CompanyRepository extends JpaRepository<Company, UUID> {





}
