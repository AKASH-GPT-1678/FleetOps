package com.gupta.fleetops.io;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleRequest {


    @NotBlank(message = "Company Id cannot br rmpty")
    private UUID companyId;

    @NotBlank(message = "Vehicle number is required")
    private String vehicleNumber;

    @NotBlank(message = "Type is required")
    private String type;

    @NotBlank(message = "Model is required")
    private String model;

    @NotBlank(message = "Manufacturer is required")
    private String manufacturer;

    @NotBlank(message = "Admin Password is Must")
    private String adminPassword;

    @Min(value = 100, message = "Capacity must be at least 100 kg")
    private int capacityInKg;

    @NotBlank(message = "Fuel type is required")
    private String fuelType;

    @NotBlank(message = "Status is required")
    private String status;

    @NotNull(message = "Registration date is required")
    private LocalDate registrationDate;
}
