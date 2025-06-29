package com.gupta.fleetops.repository;


import com.gupta.fleetops.entity.DeliveryJourney;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JourneyRepository extends JpaRepository<DeliveryJourney , UUID> {
    DeliveryJourney findByDeliveryId(UUID deliveryId);

}
