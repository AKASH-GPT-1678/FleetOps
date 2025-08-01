package com.gupta.fleetops.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "driver")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false, unique = true)
    private String licenseNumber;

    @Column(nullable = false)
    private String type;

    private LocalDate dateOfJoining;




    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
//
    @OneToOne(mappedBy = "driver", cascade = CascadeType.ALL)
    private Delivery delivery;


}
