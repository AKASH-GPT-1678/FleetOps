package com.gupta.fleetops.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDTO {

    private UUID id;
    private String name;
    private String address;
    private String type;
    private String adminEmail;

    private int vehiclesOwned;
    private int driversOwned;
    private int totalDeliveries;
    private int uniqueClients;
    private int pendingDeliveries;

    private String averageDeliveryTime;
    private String customerSatisfaction;
    private LocalDate createdAt;

    private boolean isPremium;
}
