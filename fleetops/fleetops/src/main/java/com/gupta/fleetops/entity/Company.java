package com.gupta.fleetops.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "company")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String address;
    private String type;
    private String adminEmail;
    private String adminPassword;

    private int vehiclesOwned;
    private int driversOwned;
    private int totalDeliveries;
    private int uniqueClients;
    private int pendingDeliveries;
    private String averageDeliveryTime;
    private String customerSatisfaction;
    private LocalDate createdAt;
    private boolean isPremium = false;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vehicle> vehicles = new ArrayList<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Driver> drivers = new ArrayList<>();

    @ManyToMany(mappedBy = "companies")
    private List<User> users = new ArrayList<>();
}
