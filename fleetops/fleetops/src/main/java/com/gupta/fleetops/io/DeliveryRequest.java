package com.gupta.fleetops.io;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryRequest {

    private UUID companyId;
    private UUID driverId;
    private UUID vehicleId;
    private String origin;
    private String destination;
    private Timestamp expectedTime;
    private int fuel;
    private int costPerLitre;
    private List<Long> latitude;
    private List<Long> longitude;

}
