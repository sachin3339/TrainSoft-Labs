package com.trainsoft.assessment.controller;

import com.trainsoft.assessment.commons.JWTDecode;
import com.trainsoft.assessment.commons.JWTTokenTO;
import com.trainsoft.assessment.service.IAssessmentService;
import com.trainsoft.assessment.to.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.internet.InternetAddress;
import javax.naming.Context;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;


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
    @ApiOperation(value = "getAssessmentsByTopic", notes = "API to get Assessments based on Topic.")
    public ResponseEntity<?> getAssessmentsByTopic(
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

    @PostMapping("/assessment")
    @ApiOperation(value = "", notes = "API to get Assessment.")
    public ResponseEntity<?> getAssessmentBySid(
            @ApiParam(value = "Assessment Sid", required = true) @RequestBody String assessmentSid)
    {
        return ResponseEntity.ok(assessmentService.getAssessmentBySid(assessmentSid));
    }

    @PostMapping("/assessment/Questions")
    @ApiOperation(value = "", notes = "API to get Assessment.")
    public ResponseEntity<?> getAssessmentQuestions(
            @ApiParam(value = "Assessment Sid", required = true) @RequestBody String assessmentSid)
    {
        return ResponseEntity.ok(assessmentService.getAssessmentQuestionsBySid(assessmentSid));
    }

    @PostMapping("get/instructions")
    @ApiOperation(value = "get instruction for Assessment",notes = "API to get Assessment instructions.")
    public ResponseEntity<?>getInstructionForAssessment(
            @Param("instructions payload")@RequestBody InstructionsRequestTO instructionsRequestTO){
        return ResponseEntity.ok(assessmentService.getInstructionsForAssessment(instructionsRequestTO));
    }

    @GetMapping("start/assessment/{sid}/{vSid}")
    @ApiOperation(value = "start Assessment",notes = "API to get questions and answers for starting Assessment.")
    public ResponseEntity<?> startAssessment(
            @ApiParam("Quiz Set Sid")@PathVariable("sid") String quizSetSid,
            @ApiParam("Virtual Account Sid")@PathVariable("vSid") String virtualAccountSid){
      return ResponseEntity.ok(assessmentService.startAssessment(quizSetSid,virtualAccountSid));
    }

    @PostMapping("submit/answer")
    @ApiOperation(value = "submit Assessment question answer",notes =" API to Submit question answer")
    public ResponseEntity<?> submitAnswer(
          @Param ("submit answer payload")@RequestBody SubmitAnswerRequestTO request){
       return ResponseEntity.ok(assessmentService.submitAnswer(request));
    }

  @GetMapping("review/response/{sid}")
  @ApiOperation(value = "review responses",notes = "API to get review for the Assessment.")
  public ResponseEntity<?> reviewQuestionsAndAnswers(
          @Param("Virtual Account Sid")@PathVariable("sid") String virtualAccountSid){
        return ResponseEntity.ok(assessmentService.reviewQuestionsAndAnswers(virtualAccountSid));
  }

  @PostMapping("submit/assessment")
  @ApiOperation(value = "submit Assessment",notes = "API to submit Assessment.")
  public ResponseEntity<?> submitAssessment(
          @ApiParam("submit assessment payload")@RequestBody SubmitAssessmentTO request){
     return ResponseEntity.ok(assessmentService.submitAssessment(request));
  }

    @DeleteMapping("/remove/associated/question")
    @ApiOperation(value = "Delete associated question",notes = "API to delete associated question based on given question sid.")
    public ResponseEntity<?> removeAssociatedQuestionFromAssessment(
            @ApiParam(value = "Question Sid", required = true) @RequestBody String questionSid)
    {
       return ResponseEntity.ok(assessmentService.removeAssociatedQuestionFromAssessment(questionSid));
    }

    @PostMapping("generate/assessment/url")
    @ApiOperation(value = "Generate assessment URL",notes =" API to generate assessment URL")
    public ResponseEntity<?> generateAssessmentURL(
            @Param ("Assessment Sid")@RequestBody String  assessmentSid,HttpServletRequest request)
    {
        return ResponseEntity.ok(assessmentService.generateAssessmentURL(assessmentSid,request));
    }
   @GetMapping("get/assessment/score/{qSid}/{vSid}")
   @ApiOperation(value = "Score Board",notes = "API to get scores for Assessment given.")
    public ResponseEntity<?>getScoreBoardForAssessment(
           @ApiParam("Quiz Set Sid") @PathVariable("qSid") String quizSetSid,
          @ApiParam("Virtual Account Sid") @PathVariable("vSid") String virtualAccountSid){
      return ResponseEntity.ok(assessmentService.getScoreBoard(quizSetSid,virtualAccountSid));
    }
    @GetMapping("get/user/assessment/responses/{sid}")
    @ApiOperation(value = "get user assessment responses.",notes = "API to get User submitted Assessment Question Answers details.")
    public ResponseEntity<?> findUserAssessmentRespones(
            @ApiParam("Virtual Account sid")@PathVariable("sid") String virtualAccountSid){
    return ResponseEntity.ok(assessmentService.findUserAssessmentResponses(virtualAccountSid));
    }
}