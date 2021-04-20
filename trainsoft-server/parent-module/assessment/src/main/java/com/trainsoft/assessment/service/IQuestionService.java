package com.trainsoft.assessment.service;
import com.trainsoft.assessment.to.*;

import java.util.List;

public interface IQuestionService {

    List<QuestionTypeTo> getAllQuestionTypes();
    QuestionTo createQuestionAndAnswer(QuestionTo questionTo);
    List<QuestionTo> getAllQuestions();
    QuestionTo getQuestionBySid(String questionSid);

    QuizSetTO getInstructionsForAssessment(InstructionsRequestTO instructionsRequestTO);
}
