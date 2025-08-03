package com.gupta.fleetops.controllers;


import com.gupta.fleetops.io.DeliveryDetailDTO;
import com.gupta.fleetops.io.DeliveryRequest;
import com.gupta.fleetops.io.DeliveryResponse;
import com.gupta.fleetops.io.DeliverySummaryDTO;
import com.gupta.fleetops.service.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService){
        this.deliveryService = deliveryService;
    }


    @PostMapping("/createDelivery")
    public ResponseEntity<DeliveryResponse> createDelivery(@RequestBody DeliveryRequest deliveryRequest){
        System.out.println("request Arrived");
        DeliveryResponse deliveryResponse = deliveryService.createDelivery(deliveryRequest);

        return ResponseEntity.ok().body(deliveryResponse);

    }

    @GetMapping("/myDeliveries")
    public ResponseEntity<List<DeliverySummaryDTO>> getMyDeliveries(@RequestParam UUID companyId) {
        return ResponseEntity.ok(deliveryService.getMyDeliveries(companyId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryDetailDTO> getDeliveryById(@PathVariable UUID id) {
        return ResponseEntity.ok(deliveryService.getDeliveryById(id));
    }



}
