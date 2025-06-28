package com.gupta.fleetops.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "delivery")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String Origin;
    private String destination;
    private Timestamp expectedTime;
    private int fuel;
    private int costPerLitre;

    @ElementCollection
    private List<Long> latitude;

    @ElementCollection
    private List<Long> longitude;

    // One delivery → One vehicle
    @OneToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    // Many deliveries → One driver
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    // Optional: Many deliveries → One company
    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

}
