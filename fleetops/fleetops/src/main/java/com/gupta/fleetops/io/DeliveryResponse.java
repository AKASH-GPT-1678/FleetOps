package com.gupta.fleetops.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryResponse {
    private UUID deliveryId;
    private String origin;
    private String destination;
    private Timestamp expectedTime;
    private String driverName;
    private String vehicleNumber;
    private String companyName;
}
