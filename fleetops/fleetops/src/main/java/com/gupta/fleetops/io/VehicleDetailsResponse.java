package com.gupta.fleetops.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDetailsResponse {
    private UUID id;
    private String vehicleNumber;
    private String type;
    private String model;

    private int capacityInKg;
    private String fuelType;
    private String status;
    private LocalDate registrationDate;
    private String pricePerDay;
    private String description;
    private List<String> features;
}