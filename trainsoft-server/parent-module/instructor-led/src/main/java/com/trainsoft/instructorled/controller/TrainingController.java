package com.trainsoft.instructorled.controller;

import com.trainsoft.instructorled.commons.JWTDecode;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.service.IBulkUploadService;
import com.trainsoft.instructorled.service.ITrainingService;
import com.trainsoft.instructorled.to.*;
import com.trainsoft.instructorled.value.InstructorEnum;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@AllArgsConstructor
@RestController
@Api(value = "Training related API's")
@RequestMapping("/v1")
public class TrainingController {

    IBatchService batchService;
    ITrainingService trainingService;
    IBulkUploadService bulkUploadService;


    @PostMapping(value = "/upload/list/participants",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "upload Participants excel file with Batch details. ", notes = "API to upload Participant list through excel file with Batch details.")
    public ResponseEntity<?> uploadParticipantsWithBatch(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "upload Participants excel file", required = true) @RequestParam("file") MultipartFile file,
            @RequestHeader("batchName")String batchName,@RequestHeader("instructorName")String instructorName){
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        bulkUploadService.uploadParticipantsWithBatch(file,batchName,instructorName,jwt.getCompanySid());
        return ResponseEntity.status(HttpStatus.OK).body("Uploaded the file successfully: " + file.getOriginalFilename());
    }

    @GetMapping("list/participant")
    @ApiOperation(value = "getParticipants", notes = "Get list of participants")
    public ResponseEntity<?> getParticipants(
        @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token){
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(bulkUploadService.getAllAppUsers(jwt.getCompanySid()));
        }

    @PostMapping("training/create")
    @ApiOperation(value = "createTraining", notes = "API to create new Training.")
    public ResponseEntity<?> createTraining(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Training payload", required = true) @RequestBody TrainingTO trainingTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        trainingTO.setCreatedByVASid(jwt.getVirtualAccountSid());
        trainingTO.setCompanySid(jwt.getCompanySid());
        TrainingTO createTraining = trainingService.createTraining(trainingTO);
        return ResponseEntity.ok(createTraining);
    }
    @GetMapping("/training/{trainingSid}")
    @ApiOperation(value = "getTrainingBySid", notes = "Get Training by Sid")
    public ResponseEntity<?> getTrainingBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training Sid", required = true) @PathVariable("trainingSid") String trainingSid) {
        return ResponseEntity.ok(trainingService.getTrainingBySid(trainingSid));
    }

    @GetMapping("/trainings/{pageNo}/{pageSize}")
    @ApiOperation(value = "getTrainings", notes = "Get list of training")
    public ResponseEntity<?> getTrainings(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "pageNo", required = true) @PathVariable("pageNo") int pageNo,
            @ApiParam(value = "pageSize", required = true) @PathVariable("pageSize") int pageSize) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainingsWithPagination(pageNo-1,pageSize,jwt.getCompanySid()));
    }

    @GetMapping("/trainings")
    @ApiOperation(value = "getTrainings", notes = "Get list of training")
    public ResponseEntity<?> getTrainings(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainings(jwt.getCompanySid()));
    }

    @PostMapping(value="trainingSession/create")
    @ApiOperation(value = "createTrainingSession", notes = "API to create new TrainingSession.")
    public ResponseEntity<?> createTrainingSession(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
          //  @ApiParam(value = "File upload to S3 bucket", required = true) @RequestParam("file")MultipartFile multipartFile,
            @ApiParam(value = "Create TrainingSession payload", required = true) @RequestBody TrainingSessionTO trainingSessionTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        trainingSessionTO.setCreatedByVASid(jwt.getVirtualAccountSid());
        trainingSessionTO.setCompanySid(jwt.getCompanySid());
        TrainingSessionTO createTrainingSessionTO = trainingService.createTrainingSession(trainingSessionTO);
        return ResponseEntity.ok(createTrainingSessionTO);
    }
    @GetMapping("/trainingSession/{trainingSessionSid}")
    @ApiOperation(value = "getTrainingBySid", notes = "Get Training by Sid")
    public ResponseEntity<?> getTrainingSessionBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "trainingSession Sid", required = true) @PathVariable("trainingSessionSid") String trainingSessionSid) {
        return ResponseEntity.ok(trainingService.getTrainingSessionBySid(trainingSessionSid));
    }

    @GetMapping("/trainingsession/training/{trainingSid}")
    @ApiOperation(value = "getTrainingSessionByTrainingSid ", notes = "Get list of Training session")
    public ResponseEntity<?> getTrainingSessionByTrainingSid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training Sid", required = true) @PathVariable("trainingSid") String trainingSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainingSessionByTrainingSid(trainingSid,jwt.getCompanySid()));
    }

    @GetMapping("/trainingsession/training/{trainingSid}/course/{courseSid}")
    @ApiOperation(value = "getTrainingSessionByTrainingAndCourseSid ", notes = "Get list of Training session")
    public ResponseEntity<?> getTrainingSessionByTrainingAndCourseSid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training Sid", required = true) @PathVariable("trainingSid") String trainingSid,
    @ApiParam(value = "Course Sid", required = true) @PathVariable("courseSid") String courseSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainingSessionByTrainingSidAndCourseSid(trainingSid,courseSid,jwt.getCompanySid()));
    }

    @PostMapping("user/create")
    @ApiOperation(value = "createUser", notes = "API to create new User.")
    public ResponseEntity<?> createUser(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create User payload", required = true) @RequestBody UserTO userTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        userTO.setCompanySid(jwt.getCompanySid());
        if(userTO.getDepartmentVA().getDepartmentRole()== InstructorEnum.DepartmentRole.SUPERVISOR){
            userTO.setRole(InstructorEnum.VirtualAccountRole.ADMIN);
        }else {
            userTO.setRole(InstructorEnum.VirtualAccountRole.USER);
        }
        UserTO createUser = bulkUploadService.createVirtualAccount(userTO);
        return ResponseEntity.ok(createUser);
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

    @PostMapping("generate/password")
    @ApiOperation(value = "generatePassword", notes = "API to generate Password")
    public ResponseEntity<?> generatePassword(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token){
        String password = trainingService.generatePassword();
        return ResponseEntity.ok(password);
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

    @GetMapping("trainings/{name}")
    @ApiOperation(value = "getTrainingsByName", notes = "Get list of trainings by training name")
    public ResponseEntity<?> getTrainingsByName(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training name", required = true) @PathVariable("name") String name) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainingsByName(name,jwt.getCompanySid()));
    }

    @GetMapping("trainingsessions/training/{trainingSid}/session/{name}")
    @ApiOperation(value = "getTrainingSessionsByName", notes = "Get list of training sessions by trainingSession name")
    public ResponseEntity<?> getTrainingSessionsByName(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training sid", required = true) @PathVariable("trainingSid") String trainingSid,
            @ApiParam(value = "Training Session name", required = true) @PathVariable("name") String name) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainingSessionsByName(trainingSid,name,jwt.getCompanySid()));
    }

    @DeleteMapping("delete/training/{trainingSid}")
    @ApiOperation(value = "deleteTrainingBySid", notes = "API to delete Training")
    public ResponseEntity<?> deleteTrainingBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training sid", required = true) @PathVariable("trainingSid") String trainingSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.deleteTrainingBySid(trainingSid, jwt.getVirtualAccountSid(),jwt.getCompanySid()));
    }

    @DeleteMapping("delete/trainingsession/{trainingSesssionSid}")
    @ApiOperation(value = "deleteTrainingSessionBySid", notes = "API to delete Training Session")
    public ResponseEntity<?> deleteTrainingSessionBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training Session sid", required = true) @PathVariable("trainingSesssionSid") String trainingSesssionSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.deleteTrainingSessionBySid(trainingSesssionSid, jwt.getVirtualAccountSid()));
    }

    @GetMapping("user/{str}")
    @ApiOperation(value = "getUsersByNameOrEmailOrPhoneNumber", notes = "Get list of users by name,email and phone number")
    public ResponseEntity<?> getUsersByNameOrEmailOrPhoneNumber(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Users by name,email and phone number", required = true) @PathVariable("str") String str) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getUsersByNameOrEmailOrPhoneNumber(str,jwt.getCompanySid()));
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

    @PostMapping(value = "upload/participants",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "upload participants", notes = "API to upload Participant list through excel file.")
    public ResponseEntity<?> uploadParticipants(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "upload Participants excel file", required = true) @RequestParam("file") MultipartFile file){
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        bulkUploadService.uploadParticipants(file,jwt.getCompanySid());
        return ResponseEntity.status(HttpStatus.OK).body("Uploaded the file successfully: " + file.getOriginalFilename());
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

    @PostMapping("training/update")
    @ApiOperation(value = "updateTraining", notes = "API to update existing Training.")
    public ResponseEntity<?> updateTraining(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "update Training payload", required = true) @RequestBody TrainingTO trainingTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        trainingTO.setUpdatedByVASid(jwt.getVirtualAccountSid());
        TrainingTO updateTraining = trainingService.updateTraining(trainingTO);
        return ResponseEntity.ok(updateTraining);
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

    @PostMapping("update/trainingsession")
    @ApiOperation(value = "updateTrainingSession", notes = "API to update existing Training session.")
    public ResponseEntity<?> updateTrainingSession(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "update Training Session payload", required = true) @RequestBody TrainingSessionTO trainingSessionTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        trainingSessionTO.setUpdatedByVASid(jwt.getVirtualAccountSid());
        TrainingSessionTO updateTrainingSession = trainingService.updateTrainingSession(trainingSessionTO);
        return ResponseEntity.ok(updateTrainingSession);
    }
}
