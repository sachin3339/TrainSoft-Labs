package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.*;
import com.trainsoft.assessment.value.AssessmentEnum;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;


public interface IAssessmentRepository extends JpaRepository<Assessment,Integer>
{
    @Query("FROM Assessment  as assess WHERE assess.status ='ENABLED' AND assess.sid=:assessmentSid")
    Assessment findAssessmentBySid(byte[] assessmentSid);
    @Query("FROM Assessment as assess WHERE assess.status ='ENABLED' AND assess.sid=:sid")
    Assessment findBySid(byte [] sid);
    @Query("FROM Assessment as assess WHERE assess.status ='ENABLED' AND assess.title=:title")
    Assessment findAssessmentByTitle(String title);
    @Query(value = "select * from quiz_set where tag=:id and company_id=:cid and difficulty=:df and status='ENABLED' order by created_on desc",nativeQuery = true)
    List<Assessment> findByTagAndDifficulty(@Param("id") Integer tagId,@Param("df") String difficulty,@Param("cid")Integer companyId);
    @Query("FROM Assessment  as assess WHERE assess.status ='ENABLED' AND assess.topicId=:topic order by assess.createdOn desc")
    List<Assessment> findAssessmentByTopicId(Topic topic, Pageable pageable);
    @Query("SELECT assess FROM Assessment as assess WHERE ( assess.title like :searchString OR assess.description like :searchString OR assess.categoryId.name like :searchString ) AND assess.company =:company AND assess.topicId =:topic AND assess.status ='ENABLED'")
    List<Assessment> searchAssessment(String searchString, Company company, Topic topic,Pageable pageable);

    @Query("SELECT count(assess) FROM Assessment as assess WHERE ( assess.title like :searchString OR assess.description like :searchString OR assess.categoryId.name like :searchString ) AND assess.company =:company AND assess.topicId =:topic AND assess.status ='ENABLED'")
    BigInteger pageableAssessmentCount(String searchString, Company company, Topic topic);

    @Query("SELECT COUNT(assess) FROM Assessment  as assess WHERE assess.tagId=:tag  AND assess.status='ENABLED' AND assess.company=:company")
    Integer getAssessmentsCountByTag(Company company,Tag tag);

    @Query("SELECT COUNT(assess) FROM Assessment  as assess WHERE assess.difficulty=:difficulty AND assess.status='ENABLED' AND assess.company=:company")
    Integer getAssessmentCountByDifficulty(Company company,AssessmentEnum.QuizSetDifficulty difficulty);

    @Query("SELECT assess FROM Assessment  as assess WHERE assess.categoryId=:category AND assess.status='ENABLED' AND assess.company=:company")
    List<Assessment> getAssessmentByCategory(Company company,Category category,Pageable pageable);

    @Query("SELECT COUNT(assess) FROM Assessment  as assess WHERE assess.categoryId=:category AND assess.status='ENABLED' AND assess.company=:company")
    Integer getAssessmentCountByCategory(Company company,Category category);

    @Query("SELECT assess FROM Assessment as assess WHERE ( assess.title like :searchString OR assess.description like :searchString) AND assess.company =:company AND assess.categoryId =:category AND assess.status ='ENABLED'")
    List<Assessment> searchAssessmentByCategory(Company company,Category category, String searchString,Pageable pageable);
}