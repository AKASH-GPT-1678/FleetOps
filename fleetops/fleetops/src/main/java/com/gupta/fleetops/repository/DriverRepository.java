package com.gupta.fleetops.repository;

import com.gupta.fleetops.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DriverRepository extends JpaRepository<Driver , UUID> {
}
