package com.trainsoft.assessment.service;
import com.trainsoft.assessment.commons.JWTTokenTO;
import com.trainsoft.assessment.to.*;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IQuestionService {

    List<QuestionTypeTo> getAllQuestionTypes();
    QuestionTo createQuestionAndAnswer(QuestionTo questionTo);
    List<QuestionTo> getAllQuestions();
    QuestionTo getAnswersQuestionBySid(String questionSid);
    List<QuestionTo> displayQuestionsForAssessment();
    List<CSVRecord> processQuestionAnswerInBulk(MultipartFile multipartFile, JWTTokenTO jwtTokenTO);
}
