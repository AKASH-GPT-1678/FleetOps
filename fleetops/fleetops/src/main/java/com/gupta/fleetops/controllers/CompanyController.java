package com.gupta.fleetops.controllers;



import com.gupta.fleetops.io.CompanyDTO;
import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;
import com.gupta.fleetops.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



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
    public ResponseEntity<CompanyResponse> getAllCompanies() {
        System.out.println("✅ /companies request arrived");
        CompanyResponse companies = companyService.getAllCompaniesByUser();
        System.out.println("companies:");


        return ResponseEntity.ok(companies);
    }

    @GetMapping("/myCompany")
    public ResponseEntity<CompanyDTO> getCompanyById(){

        CompanyDTO company = companyService.getCompanyById();
        return ResponseEntity.ok(company);


    }






}
