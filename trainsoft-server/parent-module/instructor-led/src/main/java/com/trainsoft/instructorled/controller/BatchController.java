package com.trainsoft.instructorled.controller;

import com.trainsoft.instructorled.commons.JWTDecode;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.service.ICourseService;
import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.CourseSessionTO;
import com.trainsoft.instructorled.to.CourseTO;
import com.trainsoft.instructorled.to.UserTO;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@Api(value = "Batch related API's")
@RequestMapping("/v1")
public class BatchController {

    IBatchService batchService;

    @PostMapping("batch/create")
    @ApiOperation(value = "createBatch", notes = "API to create new Batch.")
    public ResponseEntity<?> createBatch(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Batch payload", required = true) @RequestBody BatchTO batchTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        batchTO.setCreatedByVASid(jwt.getVirtualAccountSid());
        batchTO.setCompanySid(jwt.getCompanySid());
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

    @GetMapping("/batches/{pageNo}/{pageSize}")
    @ApiOperation(value = "getBatchesWithPagination", notes = "Get list of batch")
    public ResponseEntity<?> getBatchesWithPagination(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "pageNo", required = true) @PathVariable("pageNo") int pageNo,
            @ApiParam(value = "pageSize", required = true) @PathVariable("pageSize") int pageSize) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(batchService.getBatchesWithPagination(pageNo-1, pageSize,jwt.getCompanySid()));
    }

    @GetMapping("/batches")
    @ApiOperation(value = "getBatches", notes = "Get list of batch")
    public ResponseEntity<?> getBatches(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token){
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(batchService.getBatches(jwt.getCompanySid()));
    }


    @GetMapping("batches/{name}")
    @ApiOperation(value = "getBatchesByName", notes = "Get list of batch by Batch name")
    public ResponseEntity<?> getBatchesByName(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Batch name", required = true) @PathVariable("name") String name) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(batchService.getBatchesByName(name,jwt.getCompanySid()));
    }

    @PutMapping("update/batch")
    @ApiOperation(value = "updateBatch", notes = "API to update existing batch.")
    public ResponseEntity<?> updateBatch(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Update Batch payload", required = true) @RequestBody BatchTO batchTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        batchTO.setUpdatedByVASid(jwt.getVirtualAccountSid());
        BatchTO updateBatch = batchService.updateBatch(batchTO);
        return ResponseEntity.ok(updateBatch);
    }

    @DeleteMapping("delete/batchparticipant/{batchSid}/{vASid}")
    @ApiOperation(value = "deleteBatchParticipant", notes = "API to delete batch participant")
    public ResponseEntity<?> deleteBatch(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Batch sid", required = true) @PathVariable("batchSid") String batchSid,
            @ApiParam(value = "Virtual Account sid", required = true) @PathVariable("vASid") String vASid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(batchService.deleteParticipantsByBatchSid(batchSid, vASid));
    }

    @DeleteMapping("delete/batch/{batchSid}")
    @ApiOperation(value = "deleteBatch", notes = "API to delete batch")
    public ResponseEntity<?> deleteBatch(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Batch sid", required = true) @PathVariable("batchSid") String batchSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(batchService.deleteBatchBySid(batchSid, jwt.getVirtualAccountSid()));
    }

    @PostMapping("add/participants/batch/{batchSid}")
    @ApiOperation(value = "addParticipantsWithBatch", notes = "API to add participant with batch.")
    @ApiResponses(value= {
            @ApiResponse(code = 204, message = "Batch Sid is not valid."),
            @ApiResponse(code = 204, message = "Virtual Account Sid is not valid.")})
    public ResponseEntity<?> addParticipantsWithBatch(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Batch sid", required = true) @PathVariable("batchSid") String batchSid,
            @ApiParam(value = "List of virtualAccount sid", required = true) @RequestBody List<String> vASid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        List<UserTO> addParticipants = batchService.createMultipleUserWithBatch(batchSid,vASid, jwt.getCompanySid());
        return ResponseEntity.ok(addParticipants);
    }

    @GetMapping("batch/accounts/{batchSid}")
    @ApiOperation(value = "getBatchesByName", notes = "Get list of batch by Batch name")
    public ResponseEntity<?> getVirtualAccount(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Batch sid", required = true) @PathVariable("batchSid") String batchSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(batchService.getActiveVirtualAccountWithBatch(batchSid));
    }
}
