package com.gupta.fleetops.service.impl;

import com.gupta.fleetops.entity.*;
import com.gupta.fleetops.io.DeliveryRequest;
import com.gupta.fleetops.io.DeliveryResponse;
import com.gupta.fleetops.repository.*;
import com.gupta.fleetops.service.DeliveryService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
@Service
public class DeliveryServiceImpl implements DeliveryService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;
    private final DeliveryRepository deliveryRepository;

    public DeliveryServiceImpl(UserRepository userRepository, CompanyRepository companyRepository, DriverRepository driverRepository , DeliveryRepository deliveryRepository, VehicleRepository vehicleRepository){
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.driverRepository = driverRepository;
        this.vehicleRepository = vehicleRepository;
        this.deliveryRepository = deliveryRepository;

    }





    @Override
    public DeliveryResponse createDelivery(DeliveryRequest deliveryRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NoSuchElementException("User not found: " + authentication.getName()));



        ;
        Company existingCompany = companyRepository
                .findById(deliveryRequest.getCompanyId())
                .orElseThrow(() -> new NoSuchElementException(
                        "No company found with ID: " + deliveryRequest.getCompanyId() +
                                " for user ID: " + user.getUsername()
                ));

        Driver driver = driverRepository.findById(deliveryRequest.getDriverId())
                .orElseThrow(() -> new NoSuchElementException(
                        "No such Driver found with ID: " + deliveryRequest.getDriverId()
                ));

        Vehicle vehicle = vehicleRepository.findById(deliveryRequest.getVehicleId())
                .orElseThrow(() -> new NoSuchElementException(
                        "No such Vehicle found with ID: " + deliveryRequest.getVehicleId()
                ));
        Delivery delivery = new Delivery();
        delivery.setOrigin(deliveryRequest.getOrigin());
        delivery.setDestination(deliveryRequest.getDestination());
        delivery.setExpectedTime(deliveryRequest.getExpectedTime());
        delivery.setFuel(deliveryRequest.getFuel());
        delivery.setCostPerLitre(deliveryRequest.getCostPerLitre());
        delivery.setLatitude(deliveryRequest.getLatitude());
        delivery.setLongitude(deliveryRequest.getLongitude());

// Set relationships
        delivery.setDriver(driver);
        delivery.setVehicle(vehicle);
        delivery.setCompany(existingCompany);

// Save to DB
        Delivery savedDelivery = deliveryRepository.save(delivery);


        return new DeliveryResponse(
                savedDelivery.getId(),
                savedDelivery.getOrigin(),
                savedDelivery.getDestination(),
                savedDelivery.getExpectedTime(),
                driver.getName(),
                vehicle.getVehicleNumber(),
                existingCompany.getName()
        );




    }
}
