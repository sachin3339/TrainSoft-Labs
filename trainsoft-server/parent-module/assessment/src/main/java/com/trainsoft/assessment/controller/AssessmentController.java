package com.trainsoft.assessment.controller;

import com.trainsoft.assessment.commons.JWTDecode;
import com.trainsoft.assessment.commons.JWTTokenTO;
import com.trainsoft.assessment.service.IAssessmentService;
import com.trainsoft.assessment.service.IUserBulkUploadService;
import com.trainsoft.assessment.to.*;
import com.trainsoft.assessment.value.InstructorEnum;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;



@Slf4j
@AllArgsConstructor
@RestController
@Api(value = "Assessment related API's")
@RequestMapping("/v1")
public class AssessmentController {

    IAssessmentService assessmentService;
    IUserBulkUploadService bulkUploadService;

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

    @GetMapping("/assessments/{tsid}")
    @ApiOperation(value = "getAssessmentsByTopic", notes = "API to get Assessments based on Topic.")
    public ResponseEntity<?> getAssessmentsByTopic(
            @ApiParam("Topic sid")@PathVariable("tsid") String topicSid,Pageable pageable)
    {
        return ResponseEntity.ok(assessmentService.getAssessmentsByTopic(topicSid,pageable));
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

    @GetMapping("/assessment/{asid}")
    @ApiOperation(value = "", notes = "API to get Assessment.")
    public ResponseEntity<?> getAssessmentBySid(
            @ApiParam("Assessment sid")@PathVariable("asid") String assessmentSid)
    {
        return ResponseEntity.ok(assessmentService.getAssessmentBySid(assessmentSid));
    }

    @GetMapping("/assessment/Questions/{asid}")
    @ApiOperation(value = "", notes = "API to get Assessment Questions.")
    public ResponseEntity<?> getAssessmentQuestions(
            @ApiParam(value = "Assessment Sid", required = true) @PathVariable("asid") String assessmentSid, Pageable pageable)
    {
        return ResponseEntity.ok(assessmentService.getAssessmentQuestionsBySid(assessmentSid,pageable));
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

    @DeleteMapping("/remove/associated/question/{qsid}/{asid}")
    @ApiOperation(value = "Delete associated question",notes = "API to delete associated question based on given question sid.")
    public ResponseEntity<?> removeAssociatedQuestionFromAssessment(
            @ApiParam(value = "Question Sid", required = true) @PathVariable("qsid") String questionSid,
            @ApiParam(value = "Assessment Sid", required = true) @PathVariable("asid") String assessmentSid)
    {
       return ResponseEntity.ok(assessmentService.removeAssociatedQuestionFromAssessment(questionSid,assessmentSid));
    }

    @GetMapping("generate/assessment/url/{aSid}")
    @ApiOperation(value = "Generate assessment URL",notes =" API to generate assessment URL")
    public ResponseEntity<?> generateAssessmentURL(
            @ApiParam("Assessment Sid") @PathVariable("aSid") String assessmentSid,HttpServletRequest request)
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
            @ApiParam("virtual Account sid")@PathVariable("sid") String virtualAccountSid){
    return ResponseEntity.ok(assessmentService.findUserAssessmentResponses(virtualAccountSid));
    }

    @PutMapping("update/assessment")
    @ApiOperation(value = "Update Assessment",notes = "API to update Assessment.")
    public ResponseEntity<?> updateAssessment(
            @ApiParam(value = "Authorization token",required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Update payload",required = true)  @RequestBody AssessmentTo assessmentTo){
        JWTTokenTO jwtTokenTO = JWTDecode.parseJWT(token);
        assessmentTo.setUpdatedBySid(jwtTokenTO.getVirtualAccountSid());
        return ResponseEntity.ok(assessmentService.updateAssessment(assessmentTo));
    }

    @DeleteMapping("delete/assessment/{sid}")
    @ApiOperation(value = "delete Assessment",notes = "API to delete Assessment.")
    @ApiResponses(value = {
            @ApiResponse(code = 200,message = "Assessment deleted Successfully.")})
    public ResponseEntity<?> deleteAssessment(
            @ApiParam(value = "QuizSet Sid",required = true) @PathVariable("sid") String quizSetSid){
        assessmentService.deleteAssessment(quizSetSid);
      return ResponseEntity.ok().build();
    }

    @GetMapping("get/{classz}")
    @ApiOperation(value = "getCount", notes = "API to get Count of records based on companySid of given Type")
    public ResponseEntity<?> getCountByClass(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Given classZ", required = true) @PathVariable("classz") String classz) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(assessmentService.getCountByClass(classz,jwt.getCompanySid()));
    }

    @GetMapping("search/assessment/{searchString}/{cSid}/{tSid}")
    @ApiOperation(value = "search assessment",notes = "API to search Assessment.")
    public ResponseEntity<?>searchAssessment(
           @ApiParam("Search String") @PathVariable("searchString") String searchString,
           @ApiParam("Company Sid") @PathVariable("cSid") String companySid,
           @ApiParam("Topic Sid")@PathVariable("tSid") String topicSid,
           Pageable pageable)
    {
     return ResponseEntity.ok(assessmentService.searchAssessment(searchString,companySid,topicSid,pageable));
    }

    @PostMapping(value = "/upload/list/assess/participants",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "upload assessment Participants excel file", notes = "API to upload assessment Participant list through excel file")
    public ResponseEntity<?> uploadAssessmentParticipants(HttpServletRequest request,
         @ApiParam(value = "upload Participants excel file", required = true) @RequestParam("file") MultipartFile file,
         @ApiParam(value = "Assessment Sid", required = true) @RequestHeader("assessSid") String assessSid,
         @ApiParam(value = "Assessment url", required = true) @RequestHeader("assessUrl") String assessUrl){
        bulkUploadService.uploadAssessementParticipants(file,request,assessSid,assessUrl);
        return ResponseEntity.status(HttpStatus.OK).body("Uploaded the file successfully: ");
    }

    @PostMapping("create/assess/user")
    @ApiOperation(value = "createAssessmentUser", notes = "API to create new assessment User.")
    public ResponseEntity<?> createAssessmentUser(HttpServletRequest request,
      @ApiParam(value = "Create Assessment User payload", required = true) @RequestBody UserTO userTO,
      @ApiParam(value = "Assessment Sid", required = true) @RequestHeader("assessSid") String assessSid ) {

        if (userTO.getDepartmentVA().getDepartmentRole() == InstructorEnum.DepartmentRole.SUPERVISOR) {
            userTO.setRole(InstructorEnum.VirtualAccountRole.ADMIN);
        } else {
            userTO.setRole(InstructorEnum.VirtualAccountRole.USER);
        }
        if (userTO.getDepartmentVA().getDepartmentRole() == null) {
            userTO.getDepartmentVA().setDepartmentRole(InstructorEnum.DepartmentRole.ASSESS_USER);
        }
        UserTO createUser = bulkUploadService.createVirtualAccountWithAssessmentUser(request, userTO, assessSid);
        return ResponseEntity.ok(createUser);
    }

    @GetMapping("get/assessdetails/{aSid}")
    @ApiOperation(value = "getAssessDetails", notes = "API to get Assess Details")
    public ResponseEntity<?> getAssessDetails(@ApiParam(value = "Assessment Sid", required = true) @PathVariable("aSid") String assessmentSid)
    {
        return ResponseEntity.ok(assessmentService.getAssessDetails(assessmentSid));
    }

    @GetMapping("get/configuredusers/{aSid}")
    @ApiOperation(value = "getConfiguredUserDetailsForAssessment", notes = "API to get configured assess details based on Assessment Sid")
    public ResponseEntity<?> getConfiguredUserDetailsForAssessment(@ApiParam(value = "Assessment Sid", required = true) @PathVariable("aSid") String assessmentSid)
    {
        return ResponseEntity.ok(assessmentService.getConfiguredUserDetailsForAssessment(assessmentSid));
    }

    @GetMapping("get/today/assessment/leaderboard/{sid}")
    @ApiOperation(value = "get leaderboard for today",notes = "API to get Leaderboard for an Assessment for today.")
    public ResponseEntity<?> getLeaderBoardForAssessmentForToday(
            @ApiParam("Assessment Sid")@PathVariable("sid") String quizSetSid){
        return ResponseEntity.ok(assessmentService.getLeaderBoardForAssessmentForToday(quizSetSid));
    }

    @GetMapping("get/allTime/assessment/leaderboard/{sid}")
    @ApiOperation(value = "get leadrboard for all time. ",notes = "API to get leaderboard for an Assessment for All Time.")
    public ResponseEntity<?> getLeaderBoardAssessmentForAllTime(
            @ApiParam("Assessment Sid")@PathVariable("sid") String quizSetSid){
        return ResponseEntity.ok(assessmentService.getLeaderBoardForAssessmentForAllTime(quizSetSid));
    }

    @GetMapping("count/assessment/{searchString}/{cSid}/{tSid}")
    @ApiOperation(value = "count assessment",notes = "API to count Assessment.")
    public ResponseEntity<?> countAssessment(
            @ApiParam("Search String") @PathVariable("searchString") String searchString,
            @ApiParam("Company Sid") @PathVariable("cSid") String companySid,
            @ApiParam("Topic Sid") @PathVariable("tSid") String topicSid)
    {
        return ResponseEntity.ok(assessmentService.pageableAssessmentCount(searchString,companySid,topicSid));
    }

    @GetMapping("assess/virtualaccount/{VASid}")
    @ApiOperation(value = "getUserDetailsByVASid ", notes = "Get user details by VASid")
    public ResponseEntity<?> getUserDetailsByVASid(
            @ApiParam(value = "virtualAccount Sid", required = true) @PathVariable("VASid") String VASid) {
        log.info(String.format("Request received : User for GET /v1/users"));
        UserTO createUserTO= bulkUploadService.getVirtualAccountByVASid(VASid);
        return ResponseEntity.ok(createUserTO);
    }

    @GetMapping("quit/assessment/{qSid}/{vSid}")
    @ApiOperation(value = "quit assessment",notes = "API to quit Assessment.")
    public ResponseEntity<?> quitAssessment(
            @ApiParam(value = "Assessment Sid",required = true)@PathVariable("qSid")String quizSetSid,
            @ApiParam(value = "Virtual Account Sid",required = true)@PathVariable("vSid") String virtualAccountSid){
      return ResponseEntity.ok(assessmentService.quitAssessment(quizSetSid,virtualAccountSid));
    }

    @GetMapping("get/user/dashboard/{sid}")
    @ApiOperation(value = "get user dashboard",notes = "API to get Assessment states and User Avg percentage while" +
            " considering all categories based upon virtual account Sid")
    public ResponseEntity<?> getUserDashBoard(
            @ApiParam(value = "Virtual Account Sid",required = true) @PathVariable("sid") String virtualAccountSid){
     return   ResponseEntity.ok(assessmentService.getUserDashboard(virtualAccountSid));
    }

    @GetMapping("get/category/average/score/{sid}")
    @ApiOperation(value = "get category average score for user.",notes = "API to get Category Average Score for User.")
    public ResponseEntity<?> getUserAverageScoreByCategory(
            @ApiParam(value = "Virtual Account Sid",required = true)@PathVariable("sid") String virtualAccountSid){
        return   ResponseEntity.ok(assessmentService.getUserCategoryAverage(virtualAccountSid));
    }

    @GetMapping("get/topTen/leaderboard/{cSid}/{caSid}")
    @ApiOperation(value = "get leaderboard top ten",notes = "API to get Top 10 Users by Individual Category and All Category")
    public ResponseEntity<?> getTopTenForLeaderBoard(
            @ApiParam(value = "Company Sid",required = true) @PathVariable("cSid") String companySid,
            @ApiParam(value = "Category Sid",required = true,example = "ALL") @PathVariable("caSid") String categorySid){
        return ResponseEntity.ok( assessmentService.getTopTenForLeaderBoard(companySid,categorySid));
    }

    @GetMapping("count/assessment/{companySid}/{categorySid}")
    @ApiOperation(value = "getCountOfAssessmentsByTagsAndDifficulty ", notes = "API to get Assessments count based on Tags and Difficulty")
    public ResponseEntity<?> getCountOfAssessmentsByTagsAndDifficulty(
            @ApiParam(value = "Company Sid", required = true) @PathVariable("companySid") String companySid,
            @ApiParam(value = "Category Sid", required = true) @PathVariable("categorySid") String categorySid)
    {
        return ResponseEntity.ok(assessmentService.getCountOfAssessmentsByTagsAndDifficulty(companySid,categorySid));
    }

    @GetMapping("/assessments/category/{companySid}/{categorySid}")
    @ApiOperation(value = "getAssessmentsByCategory ", notes = "API to get Assessments based on Category and Company")
    public ResponseEntity<?> getAssessmentsByCategory(
            @ApiParam(value = "Company Sid", required = true) @PathVariable("companySid") String companySid,
            @ApiParam(value = "Category Sid", required = true) @PathVariable("categorySid") String categorySid,Pageable pageable)
    {
        return ResponseEntity.ok(assessmentService.getAssessmentsByCategory(companySid,categorySid,pageable));
    }

    @GetMapping("/assessments/count/category/{companySid}/{categorySid}")
    @ApiOperation(value = "getAssessmentCountByCategory ", notes = "API to get Assessments count based on Category and Company")
    public ResponseEntity<?> getAssessmentCountByCategory(
            @ApiParam(value = "Company Sid", required = true) @PathVariable("companySid") String companySid,
            @ApiParam(value = "Category Sid", required = true) @PathVariable("categorySid") String categorySid)
    {
        return ResponseEntity.ok(assessmentService.getAssessmentCountByCategory(companySid,categorySid));
    }

    @GetMapping("search/assessments/category/{searchString}/{companySid}/{categorySid}")
    @ApiOperation(value = "searchAssessmentByCategory",notes = "API to search Assessment by Category and Company.")
    public ResponseEntity<?>searchAssessmentByCategory(
            @ApiParam("Search String") @PathVariable("searchString") String searchString,
            @ApiParam("Company Sid") @PathVariable("companySid") String companySid,
            @ApiParam("Category Sid")@PathVariable("categorySid") String categorySid,Pageable pageable)
    {
        return ResponseEntity.ok(assessmentService.searchAssessmentByCategory(searchString,companySid,categorySid,pageable));
    }

    @PostMapping("/assessment/bookmark")
    @ApiOperation(value = "bookMarkAssessment",notes = "API to book mark Assessment")
    public ResponseEntity<?> bookMarkAssessment(
            @ApiParam("book mark Assessment payload")@RequestBody VirtualAccountHasAssessmentBookMarkTo virtualAccountHasAssessmentBookMarkTo)
    {
        return ResponseEntity.ok(assessmentService.bookMarkAssessment(virtualAccountHasAssessmentBookMarkTo));
    }

    @GetMapping("/assessments/bookmarked/{vSid}")
    @ApiOperation(value = "getBookMarkedAssessmentsByVirtualAccount",notes = "API to get book marked Assessment by Virtual Account Sid.")
    public ResponseEntity<?>getBookMarkedAssessmentsByVirtualAccount(
            @ApiParam("virtual account sid") @PathVariable("vSid") String virtualAccountSid)
    {
        return ResponseEntity.ok(assessmentService.getBookMarkedAssessmentsByVirtualAccount(virtualAccountSid));
    }

    @DeleteMapping("/assessment/remove/bookmarked")
    @ApiOperation(value = "Remove book marked Assessment",notes = "API to delete book marked Assessment based on Virtual Account.")
    public ResponseEntity<?> removeAssociatedQuestionFromAssessment(
            @ApiParam("remove book marked Assessment payload")@RequestBody VirtualAccountHasAssessmentBookMarkTo virtualAccountHasAssessmentBookMarkTo)
    {
        return ResponseEntity.ok(assessmentService.removeBookMarkedAssessment(virtualAccountHasAssessmentBookMarkTo));
    }
}