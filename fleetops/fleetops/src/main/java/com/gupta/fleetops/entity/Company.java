package com.gupta.fleetops.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
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
    private int vehiclesOwned;
    private int driversOwned;
    private int totalDeliveries;
    private int uniqueClients;
    private int pendingDeliveries;
    private String averageDeliveryTime;
    private String customerSatisfaction;
    private LocalDate createdAt;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserInfo user;

    @OneToMany(mappedBy = "company",  cascade = CascadeType.ALL , orphanRemoval = true)
    private List<Vehicle> vehicles = new ArrayList<>();


}
