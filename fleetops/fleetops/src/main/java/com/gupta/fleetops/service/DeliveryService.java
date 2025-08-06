package com.gupta.fleetops.service;


import com.gupta.fleetops.io.DeliveryDetailDTO;
import com.gupta.fleetops.io.DeliveryRequest;
import com.gupta.fleetops.io.DeliveryResponse;
import com.gupta.fleetops.io.DeliverySummaryDTO;

import java.util.List;
import java.util.UUID;

public interface DeliveryService {

    DeliveryResponse createDelivery(DeliveryRequest deliveryRequest);
    List<DeliverySummaryDTO> getMyDeliveries(UUID companyId);
    DeliveryDetailDTO getDeliveryById(UUID id);


}
