package com.gupta.fleetops.io.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfilePicResponse {
    private String message;
    private String imageUrl;
    private String fileName;
    private long fileSize;
}
