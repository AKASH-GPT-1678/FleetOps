package com.gupta.fleetops.io;


import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
public class DeliveryDetailDTO {
    private UUID id;
    private String origin;
    private String destination;
    private Timestamp expectedTime;
    private int fuel;
    private int costPerLitre;
    private List<Long> originCords;
    private List<Long> destinationCords;

    private UUID driverId;
    private String driverName;
    private UUID vehicleId;
    private String vehicleNumber;
    private UUID companyId;
}
