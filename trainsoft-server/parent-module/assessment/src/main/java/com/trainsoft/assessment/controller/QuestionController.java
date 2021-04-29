package com.trainsoft.assessment.controller;

import com.trainsoft.assessment.commons.JWTDecode;
import com.trainsoft.assessment.commons.JWTTokenTO;
import com.trainsoft.assessment.service.IQuestionService;
import com.trainsoft.assessment.to.InstructionsRequestTO;
import com.trainsoft.assessment.to.QuestionTo;
import com.trainsoft.assessment.to.QuizSetTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@AllArgsConstructor
@RestController
@Api(value = "Question and Answer related API's")
@RequestMapping("/v1")
public class QuestionController {

    IQuestionService questionService;

    @PostMapping("/create/question/individual")
    @ApiOperation(value = "createIndividualQuestion", notes = "API to create new Question.")
    public ResponseEntity<?> createIndividualQuestion(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Question payload", required = true) @RequestBody QuestionTo questionTo)
    {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        questionTo.setCreatedByVirtualAccountSid(jwt.getVirtualAccountSid());
        questionTo.setCompanySid(jwt.getCompanySid());
        return ResponseEntity.ok(questionService.createQuestionAndAnswer(questionTo));
    }

    @GetMapping("/question/types")
    @ApiOperation(value = "getQuestionType", notes = "API to get Question Types.")
    public ResponseEntity<?> getQuestionType()
    {
        return ResponseEntity.ok(questionService.getAllQuestionTypes());
    }

    @GetMapping("/questions")
    @ApiOperation(value = "getAllQuestions", notes = "API to get all Questions based on Company.")
    public ResponseEntity<?> getAllQuestions(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token)
    {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(questionService.getAllQuestions(jwt));
    }

    @GetMapping("/question/{questionSid}")
    @ApiOperation(value = "getQuestionAndAssociatedAnswers", notes = "API to get Question and Associated Answers based on selected Question.")
    public ResponseEntity<?> getQuestionAndAssociatedAnswers(
            @ApiParam(value = "Question Sid", required = true) @PathVariable("questionSid") String questionSid)
    {
        return ResponseEntity.ok(questionService.getAnswersQuestionBySid(questionSid));
    }

    @GetMapping("display/assessment/question")
    @ApiOperation(value = "displayQuestionsForAssessment", notes = "API to get all Questions which are not associated to any Assessments.")
    public ResponseEntity<?> displayQuestionsForAssessment(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token)
    {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(questionService.displayQuestionsForAssessment(jwt));
    }

    @PostMapping("question/bulkupload")
    @ApiOperation(value = "bulkQuestionAndAnswerUpload", notes = "API to handle Question and Answer upload in bulk using csv file")
    public ResponseEntity<?> bulkQuestionAndAnswerUpload(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "upload Question and Answer csv file", required = true) @RequestParam("file") @NonNull MultipartFile multipartFile)
    {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return  ResponseEntity.ok(questionService.processQuestionAnswerInBulk(multipartFile,jwt));
    }
}