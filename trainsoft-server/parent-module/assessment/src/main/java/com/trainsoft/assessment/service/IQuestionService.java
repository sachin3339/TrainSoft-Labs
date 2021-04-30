package com.trainsoft.assessment.service;
import com.trainsoft.assessment.to.*;

import java.util.List;

public interface IQuestionService {

    List<QuestionTypeTo> getAllQuestionTypes();
    QuestionTo createQuestionAndAnswer(QuestionTo questionTo);
    List<QuestionTo> getAllQuestions();
    QuestionTo getAnswersQuestionBySid(String questionSid);
    List<QuestionTo> displayQuestionsForAssessment();
    QuestionTo updateQuestion(QuestionTo request);
    void deleteQuestion(String question);

}
