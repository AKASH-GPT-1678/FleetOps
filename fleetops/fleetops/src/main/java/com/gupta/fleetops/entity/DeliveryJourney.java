package com.gupta.fleetops.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "delivery_journey")
public class DeliveryJourney {

    @Id
    private UUID deliveryId;
    private String lat;
    private String lng;
    private Timestamp timestamp;
    private boolean shouldSave;



}
