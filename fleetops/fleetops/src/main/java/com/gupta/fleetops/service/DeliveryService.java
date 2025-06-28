package com.gupta.fleetops.service;


import com.gupta.fleetops.io.DeliveryRequest;
import com.gupta.fleetops.io.DeliveryResponse;

public interface DeliveryService {

    DeliveryResponse createDelivery(DeliveryRequest deliveryRequest);
}
