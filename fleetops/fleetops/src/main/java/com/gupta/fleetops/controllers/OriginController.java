package com.gupta.fleetops.controllers;


import com.gupta.fleetops.entity.VehicleOrigin;
import com.gupta.fleetops.io.OriginDTO;
import com.gupta.fleetops.service.OriginService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/origin")
@RequiredArgsConstructor
public class OriginController {

    private final OriginService originService;




    @PostMapping("/add")
    public VehicleOrigin addOrigin(@RequestBody OriginDTO vehicleOrigin){
        System.out.println(vehicleOrigin);
        return originService.addOrigin(vehicleOrigin);
    }




}
