package com.gupta.fleetops.service;

import com.gupta.fleetops.io.VehicleRequest;
import com.gupta.fleetops.io.VehicleResponseDTO;

public interface VehicleService {


    VehicleResponseDTO addVehicleToCompany(VehicleRequest vehicleRequest);


}
