package com.trainsoft.assessment.service;

import com.trainsoft.assessment.enums.QuizStatus;
import com.trainsoft.assessment.to.*;
import org.springframework.data.domain.Pageable;
import javax.servlet.http.HttpServletRequest;
import java.math.BigInteger;
import java.util.List;

public interface IAssessmentService
{
    AssessmentTo createAssessment(AssessmentTo assessmentTo);
    List<CategoryTO> getAllCategories();
    List<AssessmentTo> getAssessmentsByTopic(String topicSid,Pageable pageable);
    List<QuestionTo> associateSelectedQuestionsToAssessment(AssessmentQuestionTo  assessmentQuestionTo);
    AssessmentTo getAssessmentBySid(String assessmentSid);
    List<QuestionTo> getAssessmentQuestionsBySid(String assessmentSid, Pageable pageable);
    AssessmentTo getInstructionsForAssessment(InstructionsRequestTO instructionsRequestTO);
    List<AssessmentQuestionTo> startAssessment(String quizSetSid,String virtualAccountSid);
     VirtualAccountHasQuestionAnswerDetailsTO submitAnswer(SubmitAnswerRequestTO request);
     VirtualAccountHasQuizSetAssessmentTO submitAssessment(SubmitAssessmentTO request);
    List<VirtualAccountHasQuestionAnswerDetailsTO> reviewQuestionsAndAnswers(String virtualAccountSid);
    String removeAssociatedQuestionFromAssessment(String questionSid,String assessmentSid);
    String generateAssessmentURL(String assessmentSid, HttpServletRequest request);
    ScoreBoardTO getScoreBoard(String quizSetSid,String virtualAccountSid);
    List<VirtualAccountHasQuestionAnswerDetailsTO> findUserAssessmentResponses(String virtualAccountSid);
    AssessmentTo updateAssessment(AssessmentTo assessmentTo);
    void deleteAssessment(String QuizSetSid);
    BigInteger getCountByClass(String classz, String companySid);
    List<AssessmentTo> searchAssessment(String searchString,String companySid,String topicSid,Pageable pageable);
    AssessmentDashboardTo getAssessDetails(String assessmentSid);
    List<AssessTo> getConfiguredUserDetailsForAssessment(String assessmentSid);
    List<LeaderBoardTO> getLeaderBoardForAssessmentForToday(String quizSetSid);
    List<LeaderBoardTO> getLeaderBoardForAssessmentForAllTime(String quizSetSid);

    BigInteger pageableAssessmentCount(String searchString,String companySid,String topicSid);

    VirtualAccountAssessmentTo quitAssessment(String quizSetSid,String virtualAccountSid);

    DashBoardTO getUserDashboard(String virtualAccountSid);

    List<CategoryAverageTO> getUserCategoryAverage(String virtualAccountSid);

    List<LeaderBoardTO> getTopTenForLeaderBoard(String companySid,String categorySid);
    AssessmentsCountTo getCountOfAssessmentsByTagsAndDifficulty(String companySid,String categorySid);
    List<AssessmentTo> getAssessmentsByCategory(String companySid,String categorySid,Pageable pageable);
    Integer getAssessmentCountByCategory(String companySid,String categorySid);
    List<AssessmentTo> searchAssessmentByCategory(String searchString,String companySid,String categorySid,Pageable pageable);
    String bookMarkAssessment(VirtualAccountHasAssessmentBookMarkTo virtualAccountHasAssessmentBookMarkTo);
    List<AssessmentTo>getBookMarkedAssessmentsByVirtualAccount(String virtualAccountSid);
    String deleteBookMarkedAssessment(VirtualAccountHasAssessmentBookMarkTo virtualAccountHasAssessmentBookMarkTo);

    List<MyAssessmentsTO> getAllMyAssessmentsAndCounts(QuizStatus status, String virtualAccountSid);

}
