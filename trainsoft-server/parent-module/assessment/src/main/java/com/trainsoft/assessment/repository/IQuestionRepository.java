package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Question;
import com.trainsoft.assessment.to.QuestionTo;
import com.trainsoft.assessment.value.AssessmentEnum;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

@org.springframework.stereotype.Repository
public interface IQuestionRepository extends JpaRepository<Question, Integer>
{
    @Query("FROM Question as ques WHERE ques.status='ENABLED' AND ques.sid=:qSid")
    Question findQuestionBySid(byte[] qSid);
    @Query(value = "SELECT ques FROM Question ques WHERE ques.status='ENABLED' AND ques.technologyName=:tagName AND ques.id NOT IN ( SELECT assess.questionId FROM AssessmentQuestion assess WHERE assess.assessmentId=:assessment) AND ques.company=:company order by ques.createdOn desc")
    List<Question> findQuestionBySidNotInAssessments(Company company, Assessment assessment,String tagName);

    @Query(value = "select question_point from question where id=:id and status='ENABLED' ",nativeQuery = true)
    Integer findQuestionPoint(@Param("id") Integer questionId);

    @Query("FROM Question  as ques WHERE ques.status='ENABLED' AND ques.name=:name AND ques.company=:company")
    List<Question> findQuestionsByName(@Param("name") String name,Company company);

    @Query("FROM Question as ques WHERE ques.status='ENABLED' AND ques.company=:company order by ques.createdOn desc")
    List<Question> findQuestionsByCompany(Company company, Pageable pageable);

    @Query("SELECT ques FROM Question as ques WHERE ( ques.name like :searchString OR ques.description like :searchString OR ques.technologyName like :searchString ) AND ques.company =:company AND ques.status='ENABLED' ")
    List<Question> searchQuestion(String searchString, Company company,Pageable pageable);

    @Query("SELECT count(ques) FROM Question as ques WHERE ( ques.name like :searchString OR ques.description like :searchString OR ques.technologyName like :searchString ) AND ques.company =:company AND ques.status='ENABLED' ")
    BigInteger pageableQuestionCount(String searchString, Company company);
}
