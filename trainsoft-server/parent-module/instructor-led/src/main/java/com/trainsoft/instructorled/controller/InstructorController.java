package com.trainsoft.instructorled.controller;

import com.trainsoft.instructorled.commons.HttpUtils;
import com.trainsoft.instructorled.commons.JWTDecode;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.service.ICompanyService;
import com.trainsoft.instructorled.service.ICourseService;
import com.trainsoft.instructorled.service.IDepartmentService;
import com.trainsoft.instructorled.to.CompanyTO;
import com.trainsoft.instructorled.to.CourseTO;
import com.trainsoft.instructorled.to.DepartmentTO;
import com.trainsoft.instructorled.to.UserTO;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    IDepartmentService departmentService;


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
    @ApiOperation(value = "getCompanyBySid", notes = "Get Company by Sid")
    public ResponseEntity<?> getCompanyBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Company Sid", required = true) @PathVariable("companySid") String companySid) {
        return ResponseEntity.ok(companyService.getCompanyBySid(companySid));
    }

    @PostMapping("dept/create")
    @ApiOperation(value = "createDepartment", notes = "API to create new Department.")
    public ResponseEntity<?> createDepartment(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Department payload", required = true) @RequestBody DepartmentTO DepartmentTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        DepartmentTO.setCreatedByVASid(jwt.getVirtualAccountSid());
        DepartmentTO.setCompanySid(jwt.getCompanySid());
        DepartmentTO createDepartment = departmentService.createDepartment(DepartmentTO);
        return ResponseEntity.ok(createDepartment);
    }

    @PutMapping("dept/update")
    @ApiOperation(value = "updateDepartment", notes = "API to update existing Department.")
    public ResponseEntity<?> updateDepartment(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Update Department payload", required = true) @RequestBody DepartmentTO DepartmentTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        DepartmentTO.setUpdatedByVASid(jwt.getVirtualAccountSid());
        DepartmentTO.setCompanySid(jwt.getCompanySid());
        DepartmentTO updateDepartment = departmentService.updateDepartment(DepartmentTO);
        return ResponseEntity.ok(updateDepartment);

    }

    @GetMapping("/dept/{deptSid}")
    @ApiOperation(value = "getDepartmentBySid", notes = "Get Department by Sid")
    public ResponseEntity<?> getDepartmentBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Department Sid", required = true) @PathVariable("deptSid") String deptSid) {
        return ResponseEntity.ok(departmentService.getDepartmentBySid(deptSid));
    }

    @DeleteMapping("/delete/dept/{deptSid}")
    @ApiOperation(value = "deleteDepartment", notes = "API to delete Department")
    public ResponseEntity<?> deleteDepartment(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Department sid", required = true) @PathVariable("deptSid") String deptSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(departmentService.deleteDepartmentBySid(deptSid, jwt.getVirtualAccountSid()));
    }

    @PostMapping(value = "/jdoodle/execute",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity findAndRunCode(
            @ApiParam(value = "Headers", required = true) @RequestHeader Map headers,
            @ApiParam(value = "Post request Body", required = true) @RequestBody Map payload){
        payload.put("versionIndex","0");
        payload.put("clientId","acba85d9bc7360b9774caaec155f59d4");
        payload.put("clientSecret","c213b545e4499db5bee098bb5295df38200dca96f52344397e3b1fd61d030e61");
        headers.clear();
        return ResponseEntity.ok(HttpUtils.postJsonUrl(payload,"https://api.jdoodle.com/v1/execute",headers));
    }

    @GetMapping("/depatments")
    @ApiOperation(value = "getDepartments", notes = "Get list of Department")
    public ResponseEntity<?> getDepartments(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token){
        return ResponseEntity.ok(departmentService.getDepartments());
    }

    @PostMapping(value = "/create/meeting/userId",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity ScheduleMeeting(
            @ApiParam(value = "Headers", required = true) @RequestHeader Map headers,
            @ApiParam(value = "Post request Body", required = true) @RequestBody Map payload){
        payload.put("id",123);
        headers.clear();
        return ResponseEntity.ok(HttpUtils.postJsonUrl(payload,"https://api.zoom.us/v2/users/{userId}/meetings",headers));
    }

}

