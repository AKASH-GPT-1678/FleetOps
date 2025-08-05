package com.gupta.fleetops.io;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;


@Data
public class DriverKycRequestDTO {

    @NotBlank(message = "Driver id is required")
    private UUID driverId;

    @NotBlank(message = "Aadhaar number is required")
    @Size(min = 12, max = 12, message = "Aadhaar number must be exactly 12 characters")
    private String aadhaarNumber;

    @NotBlank(message = "PAN number is required")
    @Size(min = 10, max = 10, message = "PAN number must be exactly 10 characters")
    private String panNumber;


}

// Getters and Setter