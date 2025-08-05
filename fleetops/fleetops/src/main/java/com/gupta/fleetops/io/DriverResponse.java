package com.gupta.fleetops.io;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriverResponse {
    private UUID id;
    private String name;
    private String phoneNumber;
    private String licenseNumber;
    private String type;
    private LocalDate dateOfJoining;
    private UUID companyId;
    private boolean status;
    private String aadharNumber;
    private String panNumber;
}
