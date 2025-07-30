package com.gupta.fleetops.controllers;


import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;
import com.gupta.fleetops.service.CompanyService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@RestController
@RequestMapping("/company")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService){
        this.companyService = companyService;
    }


    @PostMapping("/create")
    public CompanyResponse createCompany(@RequestBody CompanyRequest companyRequest){

        return companyService.createCompany(companyRequest);
    }






}
