package com.gupta.fleetops.service;
import com.gupta.fleetops.entity.DeliveryLocation;
import com.gupta.fleetops.repository.DeliveryLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class DeliveryLocationService {

    private final DeliveryJourneyService deliveryJourneyService;

    @Autowired
    private DeliveryLocationRepository repository;

    public DeliveryLocationService(DeliveryJourneyService deliveryJourneyService) {
        this.deliveryJourneyService = deliveryJourneyService;
    }





    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public DeliveryLocation saveLocation(DeliveryLocation location) {
        if (location.getTimestamp() == null) {
            location.setTimestamp(LocalDateTime.now().format(formatter));
        }

        return repository.save(location);
    }

    public List<DeliveryLocation> getRecentLocation(String deliveryId){
        List<DeliveryLocation> deliveryLocation = repository.findAllByDeliveryId(deliveryId);
        if (deliveryLocation.isEmpty()){
            throw new NoSuchElementException("No Data with this Delivery iD found ");

        }

        return deliveryLocation;

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