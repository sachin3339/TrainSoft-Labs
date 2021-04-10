package com.trainsoft.assessment.service;
import com.trainsoft.assessment.to.QuestionTo;
import com.trainsoft.assessment.to.QuestionTypeTo;

import java.util.List;

public interface IQuestionService {
    QuestionTo createQuestion(QuestionTo questionTo);
    List<QuestionTypeTo> getAllQuestionTypes(String companySid);
}
