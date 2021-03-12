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

    ICourseService courseService;
    IBatchService batchService;
    ITrainingService trainingService;
    IBulkUploadService bulkUploadService;

    @PostMapping("course/create")
    @ApiOperation(value = "createCourse", notes = "API to create new Course.")
    public ResponseEntity<?> createCourse(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Course payload", required = true) @RequestBody CourseTO courseTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        courseTO.setCreatedByVASid(jwt.getVirtualAccountSid());
        CourseTO createCourse = courseService.createCourse(courseTO);
        return ResponseEntity.ok(createCourse);
    }

    @GetMapping("/course/{courseSid}")
    @ApiOperation(value = "getCourseBySid", notes = "Get Course by Sid")
    public ResponseEntity<?> getCourseBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Course Sid", required = true) @PathVariable("courseSid") String courseSid) {
        return ResponseEntity.ok(courseService.getCourseBySid(courseSid));
    }

    @GetMapping("/courses")
    @ApiOperation(value = "getCourses", notes = "Get list of Course")
    public ResponseEntity<?> getCourses(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token) {
        log.info(String.format("Request received : User for GET /v1/courses"));
        return ResponseEntity.ok(courseService.getCourses());
    }

    @PostMapping("/create/coursesession")
    @ApiOperation(value = "createCourSession", notes = "API to add new session in course.")
    public ResponseEntity<?> createCourSession(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Course Session payload", required = true) @RequestBody CourseSessionTO courseSessionTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        courseSessionTO.setCreatedByVASid(jwt.getVirtualAccountSid());
        CourseSessionTO createSession = courseService.createSession(courseSessionTO);
        return ResponseEntity.ok(createSession);
    }

    @GetMapping("/coursesession/course/{courseSid}")
    @ApiOperation(value = "getCourseSessionByCourseSid ", notes = "Get list of Course session")
    public ResponseEntity<?> getCourseSessionByCourseSid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Course Sid", required = true) @PathVariable("courseSid") String courseSid) {
        log.info(String.format("Request received : User for GET /v1/courses"));
        return ResponseEntity.ok(courseService.findCourseSessionByCourseSid(courseSid));
    }

    @PostMapping("batch/create")
    @ApiOperation(value = "createBatch", notes = "API to create new Batch.")
    public ResponseEntity<?> createBatch(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Batch payload", required = true) @RequestBody BatchTO batchTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        batchTO.setCreatedByVASid(jwt.getVirtualAccountSid());
        BatchTO createBatch = batchService.createBatch(batchTO);
        return ResponseEntity.ok(createBatch);
    }

    @GetMapping("/batch/{batchSid}")
    @ApiOperation(value = "getBatchBySid", notes = "Get Batch by Sid")
    public ResponseEntity<?> getBatchBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Batch Sid", required = true) @PathVariable("batchSid") String batchSid) {
        return ResponseEntity.ok(batchService.getBatchBySid(batchSid));
    }

    @GetMapping("/batches")
    @ApiOperation(value = "getBatches", notes = "Get list of batch")
    public ResponseEntity<?> getBatches(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token) {
        log.info(String.format("Request received : User for GET /v1/batches"));
        return ResponseEntity.ok(batchService.getBatches());
    }

    @PostMapping(value = "/upload/list/participants",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "upload ", notes = "API to upload Participant list through excel file.")
    public ResponseEntity<?> uploadParticipants(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "upload Participants excel file", required = true) @RequestParam("file") MultipartFile file,
            @RequestHeader("batchName")String batchName,@RequestHeader("instructorName")String instructorName){
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        bulkUploadService.uploadParticipants(file,batchName,instructorName,jwt.getCompanySid());
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

    @GetMapping("vaccounts/company/{companySid}")
    @ApiOperation(value = "getTrainings", notes = "Get list of virtual account")
    public ResponseEntity<?> getTrainings(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Company Sid", required = true) @PathVariable("companySid") String companySid) {
        log.info(String.format("Request received : User for GET /v1/vaccounts"));
        return ResponseEntity.ok(bulkUploadService.getVirtualAccountByCompanySid(companySid));
    }

    @GetMapping("participants/batch/{batchSid}")
    @ApiOperation(value = "getLearnersByBatchSid", notes = "Get list of participants by Batch Sid")
    public ResponseEntity<?> getLearnersByBatchSid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Batch Sid", required = true) @PathVariable("batchSid") String batchSid) {
        log.info(String.format("Request received : User for GET /v1/list/participants"));
        return ResponseEntity.ok(trainingService.getParticipantsByBatchSid(batchSid));
    }
}
