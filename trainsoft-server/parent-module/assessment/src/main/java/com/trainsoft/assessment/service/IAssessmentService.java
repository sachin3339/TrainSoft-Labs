package com.trainsoft.assessment.service;

import com.trainsoft.assessment.entity.VirtualAccountHasQuizSetAssessment;
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

    List<AssessmentTo> searchAssessment(String searchString,String companySid,String topicSid);

    AssessmentDashboardTo getAssessDetails(String assessmentSid);
    List<AssessTo> getConfiguredUserDetailsForAssessment(String assessmentSid);

    List<LeaderBoardRequestTO> getLeaderBoardForAssessmentForToday(String quizSetSid);

    List<LeaderBoardRequestTO> getLeaderBoardForAssessmentForAllTime(String quizSetSid);

}
