package com.trainsoft.assessment.service;

import com.trainsoft.assessment.to.*;

import java.util.List;

public interface IAssessmentService
{
    AssessmentTo createAssessment(AssessmentTo assessmentTo);
    List<CategoryTO> getAllCategories();
    List<AssessmentTo> getAssessmentsByTopic(String topicSid);
    List<QuestionTo> associateSelectedQuestionsToAssessment(AssessmentQuestionTo  assessmentQuestionTo);
    AssessmentTo getAssessmentBySid(String assessmentSid);
    List<QuestionTo> getAssessmentQuestionsBySid(String assessmentSid);

    AssessmentTo getInstructionsForAssessment(InstructionsRequestTO instructionsRequestTO);

    List<AssessmentQuestionTo> startAssessment(String quizSetSid);

     VirtualAccountHasQuestionAnswerDetailsTO submitAnswer(VirtualAccountHasQuestionAnswerDetailsTO request);

     List<VirtualAccountHasQuestionAnswerDetailsTO> reviewQuestionsAndAnswers(String virtualAccountSid);
    String removeAssociatedQuestionFromAssessment(String questionSid);
}
