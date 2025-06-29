package com.gupta.fleetops.service;


import com.gupta.fleetops.entity.DeliveryLocation;
import com.gupta.fleetops.io.KafkaMessage;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {
    private final DeliveryLocationService deliveryLocationService;

    public KafkaConsumerService(DeliveryLocationService deliveryLocationService) {
        this.deliveryLocationService = deliveryLocationService;
    }


    @KafkaListener(topics = "transact", groupId = "233")
    public void consume(KafkaMessage kafkaMessage) {
        System.out.println("Message received: " + kafkaMessage)



        ;

        DeliveryLocation deliveryLocation = new DeliveryLocation();
        deliveryLocation.setDeliveryId(kafkaMessage.getDeliveryId().toString());
        deliveryLocation.setLat(kafkaMessage.getLat());
        deliveryLocation.setLng(kafkaMessage.getLng());
        deliveryLocation.setTimestamp(kafkaMessage.getTimestamp().toString());
        deliveryLocationService.saveLocation(deliveryLocation);
        System.out.println("Location saved: " + deliveryLocation);
    }
}
