package com.gupta.fleetops.controllers;


import com.gupta.fleetops.io.DeliveryRequest;
import com.gupta.fleetops.io.DeliveryResponse;
import com.gupta.fleetops.service.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService){
        this.deliveryService = deliveryService;
    }


    @PostMapping("/createdelivery")
    public ResponseEntity<DeliveryResponse> createDelivery(@RequestBody DeliveryRequest deliveryRequest){
        System.out.println("request Arrived");
        DeliveryResponse deliveryResponse = deliveryService.createDelivery(deliveryRequest);

        return ResponseEntity.ok().body(deliveryResponse);

    }
}
