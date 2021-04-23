package com.trainsoft.assessment.service;

import com.trainsoft.assessment.to.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface IAssessmentService
{
    AssessmentTo createAssessment(AssessmentTo assessmentTo);
    List<CategoryTO> getAllCategories();
    List<AssessmentTo> getAssessmentsByTopic(String topicSid);
    List<QuestionTo> associateSelectedQuestionsToAssessment(AssessmentQuestionTo  assessmentQuestionTo);
    AssessmentTo getAssessmentBySid(String assessmentSid);
    List<QuestionTo> getAssessmentQuestionsBySid(String assessmentSid);

    List<AssessmentTo> getInstructionsForAssessment(InstructionsRequestTO instructionsRequestTO);

    List<AssessmentQuestionTo> startAssessment(String quizSetSid);

     VirtualAccountHasQuestionAnswerDetailsTO submitAnswer(SubmitAnswerRequestTO request);

     VirtualAccountHasQuizSetAssessmentTO submitAssessment(SubmitAssessmentTO request);

    List<VirtualAccountHasQuestionAnswerDetailsTO> reviewQuestionsAndAnswers(String virtualAccountSid);
    String removeAssociatedQuestionFromAssessment(String questionSid);
    String generateAssessmentURL(String assessmentSid, HttpServletRequest request);
}
