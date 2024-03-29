package com.trainsoft.instructorled.controller;

import com.trainsoft.instructorled.commons.AWSUploadClient;
import com.trainsoft.instructorled.commons.JWTDecode;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.commons.Utility;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.service.IBulkUploadService;
import com.trainsoft.instructorled.service.ICompanyService;
import com.trainsoft.instructorled.service.ITrainingService;
import com.trainsoft.instructorled.to.*;
import com.trainsoft.instructorled.value.InstructorEnum;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@Api(value = "User related API's")
@RequestMapping("/v1")
public class UserController {

    IBatchService batchService;
    ITrainingService trainingService;
    IBulkUploadService bulkUploadService;
    AWSUploadClient awsUploadClient;
    ICompanyService companyService;

    @PostMapping("user/create")
    @ApiOperation(value = "createUser", notes = "API to create new User.")
    public ResponseEntity<?> createUser(HttpServletRequest request,
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create User payload", required = true) @RequestBody UserTO userTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        userTO.setCompanySid(jwt.getCompanySid());
        if(userTO.getDepartmentVA().getDepartmentRole()== InstructorEnum.DepartmentRole.SUPERVISOR){
            userTO.setRole(InstructorEnum.VirtualAccountRole.ADMIN);
        }else {
            userTO.setRole(InstructorEnum.VirtualAccountRole.USER);
        }
        UserTO createUser = bulkUploadService.createVirtualAccount(userTO,request);
        return ResponseEntity.ok(createUser);
    }

    @PostMapping("/forgot/password/{email}")
    @ApiOperation(value = "forget password", notes = "API to forget password.")
    @ApiResponses(value= {
    @ApiResponse(code = 204, message = "Email address is not valid.")})
    public ResponseEntity<?> processForgotPassword(HttpServletRequest request,
    @ApiParam(value = "Email Id", required = true) @PathVariable("email") String email)
            throws UnsupportedEncodingException, MessagingException {
        String token= companyService.generateTokenAndUpdateResetPassToken(email);
        String resetPasswordLink = Utility.getSiteURL(request)+ "/reset/" + token;
        String name=companyService.getAppUserNameByEmail(email);
        companyService.sendEmail(email,name,resetPasswordLink);
        log.info("We have sent a reset password link to your email. Please check.");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset/{token}")
    @ApiOperation(value = "reset password token", notes = "API to reset password token.")
    public ResponseEntity<?> processResetPassword(HttpServletRequest request,
        //@ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
        @ApiParam(value = " Reset Token sent in email", required = true) @PathVariable("token") String token){
        AppUserTO user = companyService.getByResetPasswordToken(token);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/password/token/{token}/user/{appUserSid}/pass/{password}")
    @ApiOperation(value = "update password", notes = "API to reset password.")
    public ResponseEntity<?> updatePassword(HttpServletRequest request,
    //@ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String jwttoken,
    @ApiParam(value = " Reset Token sent in email", required = true) @PathVariable("token") String token,
    @ApiParam(value = " User Sid", required = true) @PathVariable("appUserSid") String appUserSid,
    @ApiParam(value = " New password", required = true) @PathVariable("password") String password) {
        boolean flag = companyService.updatePassword(token, appUserSid, password);
        return ResponseEntity.ok(flag);
    }

    @PostMapping("update/user")
    @ApiOperation(value = "updateUser", notes = "API to update existing User.")
    public ResponseEntity<?> updateUser(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Update User payload", required = true) @RequestBody UserTO userTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        userTO.setCompanySid(jwt.getCompanySid());
        UserTO updateUser = bulkUploadService.updateUserDetails(userTO);
        return ResponseEntity.ok(updateUser);
    }

    @PostMapping("generate/password")
    @ApiOperation(value = "generatePassword", notes = "API to generate Password")
    public ResponseEntity<?> generatePassword(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token){
        String password = trainingService.generatePassword();
        return ResponseEntity.ok(password);
    }

    @PostMapping(value = "/upload/list/participants",consumes = {MediaType.ALL_VALUE,MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "upload Participants excel file with Batch details. ", notes = "API to upload Participant list through excel file with Batch details.")
    public ResponseEntity<?> uploadParticipantsWithBatch(HttpServletRequest request,
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "upload Participants excel file", required = false) @RequestParam("file") @Nullable MultipartFile file,
            @ApiParam(value = "Batch Name", required = true) @RequestHeader("batchName")String batchName,
            @ApiParam(value = "Training type", required = true) @RequestHeader("trainingType")String trainingType){
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        bulkUploadService.uploadParticipantsWithBatch(file,batchName,trainingType,jwt.getCompanySid(),request,jwt.getVirtualAccountSid());
        return ResponseEntity.status(HttpStatus.OK).body("Uploaded the file successfully: ");
    }

    // API's for file handling
    @PostMapping(value = "/upload",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadFile(@RequestParam("files")MultipartFile[] files){
        return  ResponseEntity.ok(awsUploadClient.uploadFiles(files));
    }

    @PostMapping(value = "upload/participants",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "upload participants", notes = "API to upload Participant list through excel file.")
    public ResponseEntity<?> uploadParticipants(HttpServletRequest request,
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "upload Participants excel file", required = true) @RequestParam("file") MultipartFile file){
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        bulkUploadService.uploadParticipants(file,jwt.getCompanySid(),request);
        return ResponseEntity.status(HttpStatus.OK).body("Uploaded the file successfully: " + file.getOriginalFilename());
    }

    @PutMapping("/update/status/{status}/virtualAccount/{vASid}")
    @ApiOperation(value = "updateVirtualAccountStatusBySid", notes = "API to update  VirtualAccount status")
    public void updateVirtualAccountStatusBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Status", required = true) @PathVariable("status") String status,
            @ApiParam(value = "Virtual sid", required = true) @PathVariable("vASid") String vASid){
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        trainingService.updateVirtualAccountStatus(vASid, status);
    }

    @PutMapping("update/v/role/{role}/{virtualAccountSid}")
    @ApiOperation(value = "updating virtual account role", notes = "API to update virtual account role")
    public ResponseEntity<?> updateVirtualAccountRole(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "role name to be update", required = true) @PathVariable(value = "role") String role,
            @ApiParam(value = "virtualAccount sid", required = true) @PathVariable(value = "virtualAccountSid") String virtualAccountSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        if(!jwt.getVirtualAccountRole().equalsIgnoreCase("ADMIN")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(trainingService.updateVirtualAccountRole(role,virtualAccountSid,jwt.getVirtualAccountSid()));
    }

    @PutMapping("update/department/role/{role}/{departmentVASid}")
    @ApiOperation(value = "updating department role", notes = "API to update department role")
    public ResponseEntity<?> updateDepartmentVASidRole(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "role name to be update", required = true) @PathVariable(value = "role") String role,
            @ApiParam(value = "departmentVASid", required = true) @PathVariable(value = "departmentVASid") String departmentVASid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        if(!jwt.getVirtualAccountRole().equalsIgnoreCase("ADMIN")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(trainingService.updateDepartmentRole(role,departmentVASid,jwt.getVirtualAccountSid()));
    }

    @GetMapping("/virtualaccount/{VASid}")
    @ApiOperation(value = "getUserDetailsByVASid ", notes = "Get user details by VASid")
    public ResponseEntity<?> getUserDetailsByVASid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "virtualAccount Sid", required = true) @PathVariable("VASid") String VASid) {
        log.info(String.format("Request received : User for GET /v1/users"));
        UserTO createUserTO= bulkUploadService.getVirtualAccountByVASid(VASid);
        return ResponseEntity.ok(createUserTO);
    }

    @GetMapping("list/participant")
    @ApiOperation(value = "getParticipants", notes = "Get list of participants")
    public ResponseEntity<?> getParticipants(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token){
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(bulkUploadService.getAllAppUsers(jwt.getCompanySid()));
    }

    @GetMapping("vaccounts/{type}/{pageNo}/{pageSize}")
    @ApiOperation(value = "getVirtualAccounts", notes = "Get list of virtual account")
    public ResponseEntity<?> getVirtualAccounts(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Type", required = true) @PathVariable(value = "type") String type,
            @ApiParam(value = "pageNo", required = true) @PathVariable("pageNo") int pageNo,
            @ApiParam(value = "pageSize", required = true) @PathVariable("pageSize") int pageSize) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(bulkUploadService.getVirtualAccountByCompanySid(jwt.getCompanySid(),type,pageNo-1,pageSize));
    }

    @GetMapping("participants/batch/{batchSid}")
    @ApiOperation(value = "getLearnersByBatchSid", notes = "Get list of participants by Batch Sid")
    public ResponseEntity<?> getLearnersByBatchSid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Batch Sid", required = true) @PathVariable("batchSid") String batchSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getParticipantsByBatchSid(batchSid,jwt.getCompanySid()));
    }

    @GetMapping("validate/email/{email}")
    @ApiOperation(value = "validate email", notes = "validate email")
    public ResponseEntity<?> validateEmail(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "email", required = true)  @PathVariable(value = "email") String email) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.validateEmail(email));
    }
    @GetMapping("validate/batch/{batchName}")
    @ApiOperation(value = "validate batch name", notes = "Validate batch")
    public ResponseEntity<?> validateBatch(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "batchName", required = true) @PathVariable(value = "batchName") String batchName) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.validateBatch(batchName,jwt.getCompanySid()));
    }

    @GetMapping("get/{classz}")
    @ApiOperation(value = "getCount", notes = "Get count of given records in given class")
    public ResponseEntity<?> getCountByClass(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Given classZ", required = true) @PathVariable("classz") String classz) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getCountByClass(classz,jwt.getCompanySid()));
    }

    @GetMapping("get/user/count/{type}")
    @ApiOperation(value = "get user count", notes = "Get count of given records in given class")
    public ResponseEntity<?> getUserCount(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "specify type", required = true) @PathVariable("type") String type) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(bulkUploadService.getUserCount(jwt.getCompanySid(),type));
    }

    @GetMapping("user/{str}")
    @ApiOperation(value = "getUsersByNameOrEmailOrPhoneNumber", notes = "Get list of users by name,email and phone number")
    public ResponseEntity<?> getUsersByNameOrEmailOrPhoneNumber(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Users by name,email and phone number", required = true) @PathVariable("str") String str) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getUsersByNameOrEmailOrPhoneNumber(str,jwt.getCompanySid()));
    }
}
