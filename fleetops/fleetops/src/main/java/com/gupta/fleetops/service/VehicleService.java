package com.gupta.fleetops.service;

import com.gupta.fleetops.entity.Vehicle;
import com.gupta.fleetops.io.VehicleDetailsResponse;
import com.gupta.fleetops.io.VehicleRequest;
import com.gupta.fleetops.io.VehicleResponseDTO;

import java.util.List;
import java.util.UUID;

public interface VehicleService {


    VehicleResponseDTO addVehicleToCompany(VehicleRequest vehicleRequest);

    List<VehicleDetailsResponse> getVehiclesByCompanyId(UUID companyId);


}
