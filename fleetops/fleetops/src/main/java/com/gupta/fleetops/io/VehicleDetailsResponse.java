package com.gupta.fleetops.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDetailsResponse {
    private Long id;
    private String vehicleNumber;
    private String type;
    private String model;
    private String manufacturer;
    private int capacityInKg;
    private String fuelType;
    private String status;
    private LocalDate registrationDate;
}