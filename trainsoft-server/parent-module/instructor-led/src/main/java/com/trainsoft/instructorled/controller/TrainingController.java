package com.trainsoft.instructorled.controller;

import com.trainsoft.instructorled.commons.JWTDecode;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.service.IBulkUploadService;
import com.trainsoft.instructorled.service.ICourseService;
import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.CourseSessionTO;
import com.trainsoft.instructorled.to.CourseTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/upload/list/participants")
    @ApiOperation(value = "upload ", notes = "API to upload Participant list through excel file.")
    public ResponseEntity<?> uploadParticipants(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "upload Participants excel file", required = true) @RequestParam MultipartFile file){
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        bulkUploadService.save(file);
        return ResponseEntity.status(HttpStatus.OK).body("Uploaded the file successfully: " + file.getOriginalFilename());
    }

    @GetMapping("list/participant")
    @ApiOperation(value = "getParticipants", notes = "Get list of participants")
    public ResponseEntity<?> getParticipants(
        @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token){
        log.info(String.format("Request received : User for GET /v1/participants"));
        return ResponseEntity.ok(bulkUploadService.getAllAppUsers());
        }


}
