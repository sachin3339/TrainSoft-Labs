package com.trainsoft.assessment.controller;

import com.trainsoft.assessment.commons.JWTDecode;
import com.trainsoft.assessment.commons.JWTTokenTO;
import com.trainsoft.assessment.service.IAssessmentService;
import com.trainsoft.assessment.to.AssessmentTo;
import com.trainsoft.assessment.to.QuestionTo;
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
}
