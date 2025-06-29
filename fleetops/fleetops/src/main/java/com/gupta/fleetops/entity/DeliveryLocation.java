package com.gupta.fleetops.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;  // ← YEH SAHI HAI (Redis ke liye)
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.sql.Timestamp;

@RedisHash("delivery_location")
public class DeliveryLocation implements Serializable {

    @Id  // ← YEH IMPORTANT HAI
    @JsonProperty("deliveryId")
    private String deliveryId;

    @JsonProperty("lat")
    private String lat;

    @JsonProperty("lng")
    private String lng;

    @JsonProperty("timestamp")
    private String timestamp;

    // Default constructor - JARURI HAI
    public DeliveryLocation() {}

    // Constructor with all fields
    public DeliveryLocation(String deliveryId, String lat, String lng, String timestamp) {
        this.deliveryId = deliveryId;
        this.lat = lat;
        this.lng = lng;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getDeliveryId() {
        return deliveryId;
    }

    public void setDeliveryId(String deliveryId) {
        this.deliveryId = deliveryId;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}