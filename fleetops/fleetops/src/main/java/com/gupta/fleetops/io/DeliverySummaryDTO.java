package com.gupta.fleetops.io;

import lombok.Data;

import java.util.UUID;
@Data
public class DeliverySummaryDTO {
    private UUID deliveryId;
    private UUID driverId;
    private String driverName;
    private UUID vehicleId;
    private String vehicleNumber;
    private UUID companyId;
    private String origin;
    private String destination;

}
