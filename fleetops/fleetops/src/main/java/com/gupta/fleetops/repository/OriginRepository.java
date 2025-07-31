package com.gupta.fleetops.repository;

import com.gupta.fleetops.entity.VehicleOrigin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OriginRepository extends JpaRepository<VehicleOrigin , UUID> {

}