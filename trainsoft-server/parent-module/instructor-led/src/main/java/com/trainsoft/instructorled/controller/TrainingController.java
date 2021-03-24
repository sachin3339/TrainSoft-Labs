package com.trainsoft.instructorled.controller;

import com.trainsoft.instructorled.commons.JWTDecode;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.service.IBulkUploadService;
import com.trainsoft.instructorled.service.ICourseService;
import com.trainsoft.instructorled.service.ITrainingService;
import com.trainsoft.instructorled.to.*;
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

import java.util.List;

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
        log.info(String.format("Request received : User for GET /v1/participants"));
        return ResponseEntity.ok(bulkUploadService.getAllAppUsers());
        }

    @PostMapping("training/create")
    @ApiOperation(value = "createTraining", notes = "API to create new Training.")
    public ResponseEntity<?> createTraining(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Training payload", required = true) @RequestBody TrainingTO trainingTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        trainingTO.setCreatedByVASid(jwt.getVirtualAccountSid());
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
        log.info(String.format("Request received : User for GET /v1/trainings"));
        return ResponseEntity.ok(trainingService.getTrainingsWithPagination(pageNo-1,pageSize));
    }

    @GetMapping("/trainings")
    @ApiOperation(value = "getTrainings", notes = "Get list of training")
    public ResponseEntity<?> getTrainings(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token) {
        log.info(String.format("Request received : User for GET /v1/trainings"));
        return ResponseEntity.ok(trainingService.getTrainings());
    }

    @PostMapping("trainingSession/create")
    @ApiOperation(value = "createTrainingSession", notes = "API to create new TrainingSession.")
    public ResponseEntity<?> createTrainingSession(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create TrainingSession payload", required = true) @RequestBody TrainingSessionTO trainingSessionTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        trainingSessionTO.setCreatedByVASid(jwt.getVirtualAccountSid());
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
        log.info(String.format("Request received : User for GET /v1/trainingsession"));
        return ResponseEntity.ok(trainingService.getTrainingSessionByTrainingSid(trainingSid));
    }

    @GetMapping("/trainingsession/training/{trainingSid}/course/{courseSid}")
    @ApiOperation(value = "getTrainingSessionByTrainingAndCourseSid ", notes = "Get list of Training session")
    public ResponseEntity<?> getTrainingSessionByTrainingAndCourseSid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training Sid", required = true) @PathVariable("trainingSid") String trainingSid,
    @ApiParam(value = "Course Sid", required = true) @PathVariable("courseSid") String courseSid)
    {
        log.info(String.format("Request received : User for GET /v1/trainingsession"));
        return ResponseEntity.ok(trainingService.getTrainingSessionByTrainingSidAndCourseSid(trainingSid,courseSid));
    }

    @PostMapping("user/create")
    @ApiOperation(value = "createUser", notes = "API to create new User.")
    public ResponseEntity<?> createUser(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create User payload", required = true) @RequestBody UserTO userTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        userTO.setCompanySid(jwt.getCompanySid());
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

    @GetMapping("vaccounts/{type}")
    @ApiOperation(value = "getVirtualAccounts", notes = "Get list of virtual account")
    public ResponseEntity<?> getVirtualAccounts(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Type", required = true) @PathVariable(value = "type") String type) {
        log.info(String.format("Request received : User for GET /v1/vaccounts"));
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(bulkUploadService.getVirtualAccountByCompanySid(jwt.getCompanySid(),type));
    }

    @GetMapping("participants/batch/{batchSid}")
    @ApiOperation(value = "getLearnersByBatchSid", notes = "Get list of participants by Batch Sid")
    public ResponseEntity<?> getLearnersByBatchSid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Batch Sid", required = true) @PathVariable("batchSid") String batchSid) {
        log.info(String.format("Request received : User for GET /v1/list/participants"));
        return ResponseEntity.ok(trainingService.getParticipantsByBatchSid(batchSid));
    }

    @GetMapping("trainings/{name}")
    @ApiOperation(value = "getTrainingsByName", notes = "Get list of trainings by training name")
    public ResponseEntity<?> getTrainingsByName(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training name", required = true) @PathVariable("name") String name) {
        log.info(String.format("Request received : User for GET /v1/list/training"));
        return ResponseEntity.ok(trainingService.getTrainingsByName(name));
    }

    @GetMapping("trainingsessions/{name}")
    @ApiOperation(value = "getTrainingSessionsByName", notes = "Get list of training sessions by trainingSession name")
    public ResponseEntity<?> getTrainingSessionsByName(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training Session name", required = true) @PathVariable("name") String name) {
        log.info(String.format("Request received : User for GET /v1/list/trainingSession"));
        return ResponseEntity.ok(trainingService.getTrainingSessionsByName(name));
    }

    @DeleteMapping("delete/training/{trainingSid}")
    @ApiOperation(value = "deleteTrainingBySid", notes = "API to delete Training")
    public ResponseEntity<?> deleteTrainingBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training sid", required = true) @PathVariable("trainingSid") String trainingSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.deleteTrainingBySid(trainingSid, jwt.getVirtualAccountSid()));
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
        log.info(String.format("Request received : User for GET /v1/list/user"));
        return ResponseEntity.ok(trainingService.getUsersByNameOrEmailOrPhoneNumber(str));
    }

    @GetMapping("get/{classz}")
    @ApiOperation(value = "getCount", notes = "Get count of given records in given class")
    public ResponseEntity<?> getCountByClass(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Given classZ", required = true) @PathVariable("classz") String classz) {
        log.info(String.format("Request received : User for GET /v1/count/classz"));
        return ResponseEntity.ok(trainingService.getCountByClass(classz));
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

}
