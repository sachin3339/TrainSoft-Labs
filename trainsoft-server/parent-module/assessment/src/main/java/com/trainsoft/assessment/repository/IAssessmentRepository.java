package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.*;
import com.trainsoft.assessment.value.AssessmentEnum;
import io.swagger.models.auth.In;
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
    @Query("FROM Assessment as assess WHERE assess.status ='ENABLED' AND assess.title=:title AND assess.company=:company ")
    Assessment findAssessmentByTitle(String title,Company company);
    @Query(value = "select * from quiz_set where tag=:id and company_id=:cid and difficulty=:df and status='ENABLED' order by created_on desc",nativeQuery = true)
    List<Assessment> findByTagAndDifficulty(@Param("id") Integer tagId,@Param("df") String difficulty,@Param("cid")Integer companyId);
    @Query("FROM Assessment  as assess WHERE assess.status ='ENABLED' AND assess.topicId=:topic order by assess.createdOn desc")
    List<Assessment> findAssessmentByTopicId(Topic topic, Pageable pageable);
    @Query("SELECT assess FROM Assessment as assess WHERE ( assess.title like :searchString OR assess.description like :searchString OR assess.categoryId.name like :searchString ) AND assess.company =:company AND assess.topicId =:topic AND assess.status ='ENABLED'")
    List<Assessment> searchAssessment(String searchString, Company company, Topic topic,Pageable pageable);

    @Query("SELECT count(assess) FROM Assessment as assess WHERE ( assess.title like :searchString OR assess.description like :searchString OR assess.categoryId.name like :searchString ) AND assess.company =:company AND assess.topicId =:topic AND assess.status ='ENABLED'")
    BigInteger pageableAssessmentCount(String searchString, Company company, Topic topic);

    @Query("SELECT COUNT(assess) FROM Assessment  as assess WHERE assess.tagId=:tag  AND assess.status='ENABLED' AND assess.categoryId=:category AND assess.company=:company")
    Integer getAssessmentsCountByTag(Company company,Tag tag,Category category);

    @Query("SELECT COUNT(assess) FROM Assessment  as assess WHERE assess.difficulty=:difficulty AND assess.status='ENABLED' AND assess.categoryId=:category AND assess.company=:company")
    Integer getAssessmentCountByDifficulty(Company company,AssessmentEnum.QuizSetDifficulty difficulty,Category category);

    @Query("SELECT assess FROM Assessment  as assess WHERE assess.company=:company AND assess.categoryId=:category AND assess.status='ENABLED'")
    List<Assessment> findAssessmentByCompanyCategory(Company company, Category category, Pageable pageable);

    @Query("SELECT COUNT(assess) FROM Assessment  as assess WHERE assess.company=:company and assess.categoryId=:category AND assess.status='ENABLED'")
    Integer findAssessmentCountByCompanyCategory(Company company, Category category);

    @Query("SELECT assess FROM Assessment as assess WHERE ( assess.title like :searchString OR assess.description like :searchString) AND assess.company =:company AND assess.categoryId =:category AND assess.status ='ENABLED'")
    List<Assessment> searchAssessmentByCategory(Company company,Category category, String searchString,Pageable pageable);

    @Query("SELECT assess FROM Assessment  as assess WHERE assess.company =:company AND assess.categoryId=:category AND assess.status ='ENABLED' AND ( assess.tagId IN (:tagList) OR assess.difficulty IN (:difficultyList))")
    List<Assessment> getAssessmentsByTagORDifficulty(List<Tag> tagList,List<AssessmentEnum.QuizSetDifficulty> difficultyList,Company company,Category category,Pageable pageable);

    @Query("SELECT assess FROM Assessment  as assess WHERE assess.company =:company AND assess.categoryId=:category AND assess.status ='ENABLED' AND assess.tagId IN (:tagList) AND assess.difficulty IN (:difficultyList)")
    List<Assessment> getAssessmentsByTagAndDifficulty(List<Tag> tagList,List<AssessmentEnum.QuizSetDifficulty> difficultyList,Company company,Category category,Pageable pageable);

    @Query("SELECT COUNT(assess) FROM Assessment  as assess WHERE assess.company =:company AND assess.categoryId=:category AND assess.status ='ENABLED' AND assess.tagId IN (:tagList) AND assess.difficulty IN (:difficultyList)")
    Integer getAssessmentsCountByTagAndDifficulty(List<Tag> tagList,List<AssessmentEnum.QuizSetDifficulty> difficultyList,Company company,Category category);

    @Query("SELECT COUNT(assess) FROM Assessment  as assess WHERE assess.company =:company AND assess.categoryId=:category AND assess.status ='ENABLED' AND ( assess.tagId IN (:tagList) OR assess.difficulty IN (:difficultyList))")
    Integer getAssessmentsCountByTagORDifficulty(List<Tag> tagList, List<AssessmentEnum.QuizSetDifficulty> difficultyList, Company company, Category category);

}