package com.gupta.fleetops.repository;

import com.gupta.fleetops.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DeliveryRepository extends JpaRepository<Delivery , UUID> {
}
