package com.gupta.fleetops.service;


import com.gupta.fleetops.entity.DeliveryJourney;
import com.gupta.fleetops.entity.DeliveryLocation;
import com.gupta.fleetops.io.KafkaMessage;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {
    private final DeliveryLocationService deliveryLocationService;
    private final DeliveryJourneyService deliveryJourneyService;

    public KafkaConsumerService(DeliveryLocationService deliveryLocationService, DeliveryJourneyService deliveryJourneyService) {
        this.deliveryLocationService = deliveryLocationService;
        this.deliveryJourneyService = deliveryJourneyService;
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
        deliveryLocation.setShouldSave(kafkaMessage.isShouldSave());
        deliveryLocationService.saveLocation(deliveryLocation);



        if (kafkaMessage.isShouldSave()) {
            DeliveryJourney deliveryJourney = new DeliveryJourney();
            deliveryJourney.setDeliveryId(kafkaMessage.getDeliveryId());
            deliveryJourney.setShouldSave(kafkaMessage.isShouldSave());
            deliveryJourney.setTimestamp(kafkaMessage.getTimestamp());
            deliveryJourney.setLat(kafkaMessage.getLat());
            deliveryJourney.setLng(kafkaMessage.getLng());
            deliveryJourneyService.saveJourney(deliveryJourney);
        }

        System.out.println("Location saved: " + deliveryLocation);
    }
}
