package com.trainsoft.instructorled.controller;

import com.trainsoft.instructorled.commons.HttpUtils;
import com.trainsoft.instructorled.commons.JWTDecode;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.service.ICompanyService;
import com.trainsoft.instructorled.to.CompanyTO;
import org.springframework.http.MediaType;
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

import java.util.HashMap;
import java.util.Map;

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
           // @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Company Sid", required = true) @PathVariable("companySid") String companySid) {
        return ResponseEntity.ok(companyService.getCompanyBySid(companySid));
    }

    @PostMapping(value = "/jdoodle/execute",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity findAndRunCode(
           // @ApiParam(value = "Authorization", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Headers", required = true) @RequestHeader Map headers,
            @ApiParam(value = "Post request Body", required = true) @RequestBody Map payload){
       // JWTTokenTO jwt = JWTDecode.parseJWT(token);
        payload.put("versionIndex","0");
        payload.put("clientId","acba85d9bc7360b9774caaec155f59d4");
        payload.put("clientSecret","c213b545e4499db5bee098bb5295df38200dca96f52344397e3b1fd61d030e61");
        headers.clear();
        return ResponseEntity.ok(HttpUtils.postJsonUrl(payload,"https://api.jdoodle.com/v1/execute",headers));

    }
}

