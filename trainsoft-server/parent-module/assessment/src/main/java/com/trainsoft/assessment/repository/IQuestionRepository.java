package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Question;
import com.trainsoft.assessment.to.QuestionTo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@org.springframework.stereotype.Repository
public interface IQuestionRepository extends JpaRepository<Question, Integer>
{
    @Query("FROM Question as ques WHERE ques.status<>'DELETED' AND ques.sid=:qSid")
    Question findQuestionBySid(byte[] qSid);
    @Query(value = "SELECT ques FROM Question ques WHERE ques.status<>'DELETED' AND ques.id NOT IN ( SELECT assess.questionId FROM AssessmentQuestion assess) AND ques.company=:company order by ques.createdOn desc")
    List<Question> findQuestionBySidNotInAssessments(Company company);

    @Query(value = "select question_point from question where id=:id and status<>'DELETED'",nativeQuery = true)
    Integer findQuestionPoint(@Param("id") Integer questionId);

    @Query("FROM Question  as ques WHERE ques.status<>'DELETED' AND ques.name=:name")
    Question findQuestionsByName(@Param("name") String name);

    @Query("FROM Question as ques WHERE ques.status<>'DELETED' AND ques.company=:company order by ques.createdOn desc")
    List<Question> findQuestionsByCompany(Company company, Pageable pageable);
}
