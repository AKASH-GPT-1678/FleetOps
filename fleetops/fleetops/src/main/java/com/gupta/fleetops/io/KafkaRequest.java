package com.gupta.fleetops.io;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KafkaRequest {
    private UUID deliveryId;
    private String lat;
    private String lng;
    private boolean shouldSave;
}
