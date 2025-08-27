package com.gupta.fleetops.io;


import lombok.Data;

import java.util.UUID;

@Data
public class ProfileResponse {
    private UUID id;
    private String username;
    private String email;
    private String roles;
    private boolean isPremium;
}
