package com.gupta.fleetops.service;

import com.gupta.fleetops.entity.VehicleOrigin;
import com.gupta.fleetops.io.OriginDTO;

public interface OriginService {


    VehicleOrigin addOrigin(OriginDTO vehicleOrigin);
    VehicleOrigin getOrigin(String vehicleId);
}
