package com.trainsoft.assessment.service;

import com.trainsoft.assessment.to.AssessmentTo;
import com.trainsoft.assessment.to.QuizSetHasQuestionTO;

import java.util.List;

public interface IAssessmentService
{
    AssessmentTo createAssessment(AssessmentTo assessmentTo);

    List<QuizSetHasQuestionTO> startAssessment(String quizSetSid);
}
