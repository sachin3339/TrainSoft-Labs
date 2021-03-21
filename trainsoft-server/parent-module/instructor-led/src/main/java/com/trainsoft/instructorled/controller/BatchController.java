package com.trainsoft.instructorled.controller;

import com.trainsoft.instructorled.commons.JWTDecode;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.service.ICourseService;
import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.CourseSessionTO;
import com.trainsoft.instructorled.to.CourseTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @ApiOperation(value = "getBatches", notes = "Get list of batch")
    public ResponseEntity<?> getBatches(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "pageNo", required = true) @PathVariable("pageNo") int pageNo,
            @ApiParam(value = "pageSize", required = true) @PathVariable("pageSize") int pageSize)
    {
        log.info(String.format("Request received : User for GET /v1/batches"));
        return ResponseEntity.ok(batchService.getBatchesWithPagination(pageNo-1, pageSize));
    }

    @GetMapping("batches/{name}")
    @ApiOperation(value = "getBatchesByName", notes = "Get list of batch by Batch name")
    public ResponseEntity<?> getBatchesByName(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Batch name", required = true) @PathVariable("name") String name) {
        log.info(String.format("Request received : User for GET /v1/list/batch"));
        return ResponseEntity.ok(batchService.getBatchesByName(name));
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

    @DeleteMapping("delete/batch/{batchSid}")
    @ApiOperation(value = "deleteBatch", notes = "API to delete batch")
    public ResponseEntity<?> deleteBatch(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Batch sid", required = true) @PathVariable("batchSid") String batchSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(batchService.deleteBatchBySid(batchSid, jwt.getVirtualAccountSid()));
    }
}
