package com.gupta.fleetops.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleNumber;
    private String type;
    private String model;               // E.g. "Tata Ace", "Mahindra Bolero";        // E.g. "Tata Motors", "Ashok Leyland"
    private int capacityInKg;           // How much weight it can carry
    private String fuelType;            // E.g. Diesel, Petrol, Electric
    private String status;
    private String image;
    private String description;
    private String pricePerDay;
    private boolean originVerified = false;
    private List<String> features;

    private LocalDate registrationDate;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;


    @OneToOne(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private Delivery delivery;










}
