package com.gupta.fleetops.controllers;


import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;
import com.gupta.fleetops.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
    };



    @GetMapping("/companies")
    public ResponseEntity<List<CompanyResponse>> getAllCompanies() {
        System.out.println("✅ /companies request arrived");
        List<CompanyResponse> companies = companyService.getAllCompaniesByUser();
        System.out.println("🔢 Companies found: " + companies.size());

        return ResponseEntity.ok(companies);
    }






}
