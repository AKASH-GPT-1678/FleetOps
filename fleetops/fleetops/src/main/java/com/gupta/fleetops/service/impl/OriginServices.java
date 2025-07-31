package com.gupta.fleetops.service.impl;

import com.gupta.fleetops.entity.VehicleOrigin;
import com.gupta.fleetops.io.OriginDTO;
import com.gupta.fleetops.repository.OriginRepository;
import com.gupta.fleetops.service.OriginService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OriginServices implements OriginService {

    private final OriginRepository originRepository;


    @Override
    public VehicleOrigin addOrigin(OriginDTO vehicleOrigin) {
        System.out.println((vehicleOrigin));
        VehicleOrigin newOrigin = new VehicleOrigin();
        newOrigin.setVehicleId(vehicleOrigin.getVehicleId());
        newOrigin.setOrigin(vehicleOrigin.getOrigin());
        newOrigin.setVerified(true);
        originRepository.save(newOrigin);

        return newOrigin;
    }

    @Override
    public VehicleOrigin getOrigin(String vehicleId) {
        return null;
    }
}
