package com.trainsoft.assessment.controller;

import com.trainsoft.assessment.commons.JWTDecode;
import com.trainsoft.assessment.commons.JWTTokenTO;
import com.trainsoft.assessment.service.IAssessmentService;
import com.trainsoft.assessment.to.AssessmentQuestionTo;
import com.trainsoft.assessment.to.AssessmentTo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@Api(value = "Assessment related API's")
@RequestMapping("/v1")
public class AssessmentController {

    IAssessmentService assessmentService;

    @PostMapping("/create/assessment")
    @ApiOperation(value = "createAssessment", notes = "API to create new Assessment.")
    public ResponseEntity<?> createAssessment(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Assessment payload", required = true) @RequestBody AssessmentTo assessmentTo)
    {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        assessmentTo.setCompanySid(jwt.getCompanySid());
        assessmentTo.setCreatedByVirtualAccountSid(jwt.getVirtualAccountSid());
        return ResponseEntity.ok(assessmentService.createAssessment(assessmentTo));
    }

    @GetMapping("/categories")
    @ApiOperation(value = "getCategories", notes = "API to get Categories.")
    public ResponseEntity<?> getCategories()
    {
        return ResponseEntity.ok(assessmentService.getAllCategories());
    }

    @PostMapping("/assessments")
    @ApiOperation(value = "getAssessments", notes = "API to get Assessments based on Topic.")
    public ResponseEntity<?> getAssessments(
            @ApiParam(value = "Topic Sid", required = true) @RequestBody String topicSid)
    {
        return ResponseEntity.ok(assessmentService.getAssessmentsByTopic(topicSid));
    }

    @PostMapping("/associate/Question")
    @ApiOperation(value = "associateSelectedQuestionsToAssessment", notes = "API to associate selected Questions to Assessment.")
    public ResponseEntity<?> associateSelectedQuestionsToAssessment(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "List of Selected Question Sid's and Topic associated", required = true) @RequestBody AssessmentQuestionTo assessmentQuestionTo)
    {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        assessmentQuestionTo.setVirtualAccountSid(jwt.getVirtualAccountSid());
        assessmentQuestionTo.setCompanySid(jwt.getCompanySid());
        return ResponseEntity.ok(assessmentService.associateSelectedQuestionsToAssessment(assessmentQuestionTo));
    }
}