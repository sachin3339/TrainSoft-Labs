package com.trainsoft.assessment.controller;

import com.trainsoft.assessment.commons.JWTDecode;
import com.trainsoft.assessment.commons.JWTTokenTO;
import com.trainsoft.assessment.service.IQuestionService;
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

    IQuestionService questionService;

    @PostMapping("create/question/individual")
    @ApiOperation(value = "createIndividualQuestion", notes = "API to create new Course.")
    public ResponseEntity<?> createIndividualQuestion(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Course payload", required = true) @RequestBody QuestionTo questionTo)
    {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        questionTo.setCreatedByVirtualAccountSid(jwt.getVirtualAccountSid());
        questionTo.setCompanySid(jwt.getCompanySid());
        return ResponseEntity.ok(questionService.createQuestionAndAnswer(questionTo));
    }

    @GetMapping("question/types")
    @ApiOperation(value = "getQuestionType", notes = "API to get Question Types.")
    public ResponseEntity<?> getQuestionType()
    {
        return ResponseEntity.ok(questionService.getAllQuestionTypes());
    }
}
