package com.gupta.fleetops.io;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleResponseDTO {
        private UUID id;
        private String message;
        private String vehicleNumber;
        private String companyName;


}
