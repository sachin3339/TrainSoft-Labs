package com.trainsoft.assessment.controller;

import com.trainsoft.assessment.commons.JWTDecode;
import com.trainsoft.assessment.commons.JWTTokenTO;
import com.trainsoft.assessment.service.IQuestionService;
import com.trainsoft.assessment.to.InstructionsRequestTO;
import com.trainsoft.assessment.to.QuestionTo;
import com.trainsoft.assessment.to.QuizSetTO;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/questions")
    @ApiOperation(value = "getAllQuestions", notes = "API to get all Questions.")
    public ResponseEntity<?> getAllQuestions()
    {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @PostMapping("/question/{questionSid}")
    @ApiOperation(value = "getQuestionAndAssociatedAnswers", notes = "API to get Question and Associated Answers based on selected Question.")
    public ResponseEntity<?> getQuestionAndAssociatedAnswers(
            @ApiParam(value = "Question Sid", required = true) @PathVariable("questionSid") String questionSid)
    {
        return ResponseEntity.ok(questionService.getAnswersQuestionBySid(questionSid));
    }

    @PostMapping("display/assessment/question")
    @ApiOperation(value = "displayQuestionsForAssessment", notes = "API to get all Questions which are not associated to any Assessments.")
    public ResponseEntity<?> displayQuestionsForAssessment()
    {
        return ResponseEntity.ok(questionService.displayQuestionsForAssessment());
    }

    @PutMapping("update/question")
    @ApiOperation(value = "update Question with it's associated answers",
            notes = "API to update question and it's associated answers.")
    public ResponseEntity<?> updateQuestion(
            @ApiParam("update question payload")@RequestBody QuestionTo request){
      return   ResponseEntity.ok(questionService.updateQuestion(request));
    }

    @DeleteMapping("delete/question/{sid}")
    @ApiResponses(value = {
            @ApiResponse(code = 200,message = "question and it's associated answers deleted successfully."),
    @ApiResponse(code = 403,message = "Given question Sid is associated with an Assessment.Request can't be processed."),
    @ApiResponse(code = 401,message = "Invalid Question Sid.")})
    @ApiOperation(value = "delete question with associated answer",
            notes = "API to delete question with it's associated answers.")
    public ResponseEntity<?> deleteQuestion(
            @ApiParam("Question Sid")@PathVariable("sid") String questionSid){
        questionService.deleteQuestion(questionSid);
        return ResponseEntity.ok().build();
    }
}
