package com.trainsoft.assessment.service;
import com.trainsoft.assessment.to.QuestionTo;
import com.trainsoft.assessment.to.QuestionTypeTo;

import java.util.List;

public interface IQuestionService {

    List<QuestionTypeTo> getAllQuestionTypes();
    QuestionTo createQuestionAndAnswer(QuestionTo questionTo);
    List<QuestionTo> getAllQuestions();
    QuestionTo getQuestionBySid(String questionSid);
    List<QuestionTo> displayQuestionsForAssessment();
}
