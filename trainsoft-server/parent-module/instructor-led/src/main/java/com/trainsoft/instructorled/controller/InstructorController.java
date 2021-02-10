package com.trainsoft.instructorled.controller;

import com.trainsoft.instructorled.jwttoken.JWTDecode;
import com.trainsoft.instructorled.jwttoken.JWTTokenTO;
import com.trainsoft.instructorled.service.ICompanyService;
import com.trainsoft.instructorled.to.CompanyTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
@RestController
@Api(value = "Instructor led API's")
@RequestMapping("/v1")
public class InstructorController {

    ICompanyService companyService;

    @PostMapping("/create")
    @ApiOperation(value = "createCompany", notes = "API to create new Company.")
    public ResponseEntity<?> createCompany(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Company payload", required = true) @RequestBody CompanyTO companyTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        companyTO.setCreatedByVASid(jwt.getVirtualAccountSid());
        CompanyTO createCompany = companyService.createCompany(companyTO);
        return ResponseEntity.ok(createCompany);
    }

    @GetMapping("/company/{companySid}")
    @ApiOperation(value = "getCompanyBySid", notes = "Get list of Company")
    public ResponseEntity<?> getCompanyBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Company Sid", required = true) @PathVariable("companySid") String companySid) {
        return ResponseEntity.ok(companyService.getCompanyBySid(companySid));
    }
}

