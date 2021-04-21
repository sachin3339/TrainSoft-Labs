package com.trainsoft.assessment.service;

import com.trainsoft.assessment.to.AssessmentQuestionTo;
import com.trainsoft.assessment.to.AssessmentTo;
import com.trainsoft.assessment.to.CategoryTo;
import com.trainsoft.assessment.to.QuestionTo;
import java.util.List;
import com.trainsoft.assessment.to.QuizSetHasQuestionTO;

import java.util.List;

public interface IAssessmentService
{
    AssessmentTo createAssessment(AssessmentTo assessmentTo);
    List<CategoryTo> getAllCategories();
    List<AssessmentTo> getAssessmentsByTopic(String topicSid);
    List<QuestionTo> associateSelectedQuestionsToAssessment(AssessmentQuestionTo  assessmentQuestionTo);
    AssessmentTo getAssessmentBySid(String assessmentSid);
    List<QuestionTo> getAssessmentQuestionsBySid(String assessmentSid);

    List<QuizSetHasQuestionTO> startAssessment(String quizSetSid);
}
