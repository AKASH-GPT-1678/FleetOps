package com.gupta.fleetops.repository;

import com.gupta.fleetops.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VehicleRepository extends JpaRepository<Vehicle , Long> {
}
