package com.trainsoft.instructorled.controller;

import com.trainsoft.instructorled.commons.AWSUploadClient;
import com.trainsoft.instructorled.commons.JWTDecode;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.service.IBulkUploadService;
import com.trainsoft.instructorled.service.ITrainingService;
import com.trainsoft.instructorled.to.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@AllArgsConstructor
@RestController
@Api(value = "Training related API's")
@RequestMapping("/v1")
public class TrainingController {

    IBatchService batchService;
    ITrainingService trainingService;
    IBulkUploadService bulkUploadService;
    AWSUploadClient awsUploadClient;


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

    @GetMapping("/trainings/{pageNo}/{pageSize}")
    @ApiOperation(value = "getTrainings", notes = "Get list of training")
    public ResponseEntity<?> getTrainings(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "pageNo", required = true) @PathVariable("pageNo") int pageNo,
            @ApiParam(value = "pageSize", required = true) @PathVariable("pageSize") int pageSize) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainingsWithPagination(pageNo - 1, pageSize, jwt.getCompanySid()));
    }

    @GetMapping("/trainings")
    @ApiOperation(value = "getTrainings", notes = "Get list of training")
    public ResponseEntity<?> getTrainings(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainings(jwt.getCompanySid()));
    }

    @DeleteMapping("delete/training/{trainingSid}")
    @ApiOperation(value = "deleteTrainingBySid", notes = "API to delete Training")
    public ResponseEntity<?> deleteTrainingBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training sid", required = true) @PathVariable("trainingSid") String trainingSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.deleteTrainingBySid(trainingSid, jwt.getVirtualAccountSid(), jwt.getCompanySid()));
    }

    @PostMapping(value = "trainingSession/create/{instructorSid}")
    @ApiOperation(value = "createTrainingSession", notes = "API to create new TrainingSession.")
    public ResponseEntity<?> createTrainingSession(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create TrainingSession payload", required = true) @RequestBody TrainingSessionTO trainingSessionTO,
            @ApiParam(value = "Instructor sid", required = true) @PathVariable("instructorSid") String instructorSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        trainingSessionTO.setCreatedByVASid(jwt.getVirtualAccountSid());
        trainingSessionTO.setCompanySid(jwt.getCompanySid());
        TrainingSessionTO createTrainingSessionTO = trainingService.createTrainingSession(trainingSessionTO,instructorSid);
        return ResponseEntity.ok(createTrainingSessionTO);
    }

    @GetMapping("/trainingSession/{trainingSessionSid}")
    @ApiOperation(value = "getTrainingBySid", notes = "Get Training by Sid")
    public ResponseEntity<?> getTrainingSessionBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "trainingSession Sid", required = true) @PathVariable("trainingSessionSid") String trainingSessionSid) {
        return ResponseEntity.ok(trainingService.getTrainingSessionBySid(trainingSessionSid));
    }

    @PostMapping({"update/trainingsession/","update/trainingsession/{meetingId}"})
    @ApiOperation(value = "updateTrainingSession", notes = "API to update existing Training session.")
    public ResponseEntity<?> updateTrainingSession(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "update Training Session payload", required = true) @RequestBody TrainingSessionTO trainingSessionTO,
            @ApiParam(value = "Zoom Meeting Id", required = false) @PathVariable("meetingId")  String meetingId) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        trainingSessionTO.setUpdatedByVASid(jwt.getVirtualAccountSid());
        String meetingID = meetingId.equalsIgnoreCase("undefined")||meetingId.equalsIgnoreCase("null") ? null : meetingId;
        TrainingSessionTO updateTrainingSession = trainingService.updateTrainingSession(trainingSessionTO,meetingID);
        return ResponseEntity.ok(updateTrainingSession);
    }

    @GetMapping("/trainingsession/training/{trainingSid}")
    @ApiOperation(value = "getTrainingSessionByTrainingSid ", notes = "Get list of Training session")
    public ResponseEntity<?> getTrainingSessionByTrainingSid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training Sid", required = true) @PathVariable("trainingSid") String trainingSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainingSessionByTrainingSid(trainingSid, jwt.getCompanySid()));
    }

    @GetMapping("/trainingsession/training/{trainingSid}/course/{courseSid}")
    @ApiOperation(value = "getTrainingSessionByTrainingAndCourseSid ", notes = "Get list of Training session")
    public ResponseEntity<?> getTrainingSessionByTrainingAndCourseSid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training Sid", required = true) @PathVariable("trainingSid") String trainingSid,
            @ApiParam(value = "Course Sid", required = true) @PathVariable("courseSid") String courseSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainingSessionByTrainingSidAndCourseSid(trainingSid, courseSid, jwt.getCompanySid()));
    }

    @GetMapping("trainings/{name}")
    @ApiOperation(value = "getTrainingsByName", notes = "Get list of trainings by training name")
    public ResponseEntity<?> getTrainingsByName(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training name", required = true) @PathVariable("name") String name) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainingsByName(name, jwt.getCompanySid()));
    }

    @GetMapping("trainingsessions/training/{trainingSid}/session/{name}")
    @ApiOperation(value = "getTrainingSessionsByName", notes = "Get list of training sessions by trainingSession name")
    public ResponseEntity<?> getTrainingSessionsByName(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training sid", required = true) @PathVariable("trainingSid") String trainingSid,
            @ApiParam(value = "Training Session name", required = true) @PathVariable("name") String name) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainingSessionsByName(trainingSid, name, jwt.getCompanySid()));
    }

    @DeleteMapping("delete/trainingsession/{trainingSesssionSid}")
    @ApiOperation(value = "deleteTrainingSessionBySid", notes = "API to delete Training Session")
    public ResponseEntity<?> deleteTrainingSessionBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Training Session sid", required = true) @PathVariable("trainingSesssionSid") String trainingSesssionSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.deleteTrainingSessionBySid(trainingSesssionSid, jwt.getVirtualAccountSid()));
    }

    @PostMapping({"update/session/{sessionSid}/{status}/","update/session/{sessionSid}/{status}/{meetingId}"})
    @ApiOperation(value = "updateTraining", notes = "API to update existing Training.")
    public void updateSessionStatus(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "session sid", required = true) @PathVariable("sessionSid") String sessionSid,
            @ApiParam(value = "status", required = true) @PathVariable("status") String status,
            @ApiParam(value = "Zoom meeting Id", required = true) @PathVariable("meetingId") String meetingId) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        String meetingID = meetingId.equalsIgnoreCase("undefined")||meetingId.equalsIgnoreCase("null") ? null : meetingId;
        trainingService.updateTrainingSessionStatus(sessionSid, status, jwt.getVirtualAccountSid(), meetingID);
    }

    @GetMapping("/trainer/trainings/{pageNo}/{pageSize}")
    @ApiOperation(value = "getTrainingsOnRole", notes = "Get list of training by role")
    public ResponseEntity<?> getTrainingsOnRole(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "pageNo", required = true) @PathVariable("pageNo") int pageNo,
            @ApiParam(value = "pageSize", required = true) @PathVariable("pageSize") int pageSize) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(trainingService.getTrainingsOnRoleWithPagination(pageNo - 1, pageSize, jwt.getCompanySid(), jwt.getVirtualAccountSid()));
    }

   // @GetMapping("/trainings/learner/{pageNo}/{pageSize}")
   @GetMapping("/learner/trainings")
    @ApiOperation(value = "getLearnersTrainings", notes = "Get list of training by leaners")
    public ResponseEntity<?> getLearnersTrainings(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token)
/*            @ApiParam(value = "pageNo", required = true) @PathVariable("pageNo") int pageNo,
            @ApiParam(value = "pageSize", required = true) @PathVariable("pageSize") int pageSize)*/ {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
     return ResponseEntity.ok(trainingService.getTrainingsForLeaner(jwt.getVirtualAccountSid(), jwt.getCompanySid()));
    }
}
