package com.gupta.fleetops.service;
import com.gupta.fleetops.entity.DeliveryLocation;
import com.gupta.fleetops.repository.DeliveryRepository;
import com.gupta.fleetops.repository.DeliveryLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class DeliveryLocationService {

    @Autowired
    private DeliveryLocationRepository repository;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public DeliveryLocation saveLocation(DeliveryLocation location) {
        if (location.getTimestamp() == null) {
            location.setTimestamp(LocalDateTime.now().format(formatter));
        }
        return repository.save(location);
    }

    public DeliveryLocation getLatestLocation(String deliveryId) {
        return repository.findByDeliveryId(deliveryId).get();
    }

    public Optional<DeliveryLocation> getLocationByDeliveryId(String deliveryId) {
        return repository.findByDeliveryId(deliveryId)
                ;
    }

    public List<DeliveryLocation> getAllLocations() {
        return repository.findAll();
    }

    public void deleteLocation(String deliveryId) {
        repository.deleteById(deliveryId);
    }

    public boolean existsByDeliveryId(String deliveryId) {
        return repository.existsById(deliveryId);
    }
}