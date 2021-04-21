package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@org.springframework.stereotype.Repository
public interface IQuestionRepository extends JpaRepository<Question, Integer>
{
    Question findQuestionBySid(byte[] hexStringToByteArray);
    @Query(value = "SELECT ques FROM Question ques WHERE ques.id NOT IN ( SELECT assess.questionId FROM AssessmentQuestion assess)")
    List<Question> findQuestionBySidNotInAssessments();
}
