package com.gupta.fleetops.io.response;


import lombok.Data;

@Data
public class NewDriverProfileResponse {

    private String message;

    private String imageUrl;

    private String fileName;

    private long uploadedAt;

    private boolean success;
}
