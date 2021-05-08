package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Topic;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface IAssessmentRepository extends JpaRepository<Assessment,Integer>
{
    @Query("FROM Assessment  as assess WHERE assess.status <> 'DELETED' AND assess.sid=:assessmentSid")
    Assessment findAssessmentBySid(byte[] assessmentSid);
    @Query("FROM Assessment as assess WHERE assess.status <> 'DELETED' AND assess.sid=:sid")
    Assessment findBySid(byte [] sid);
    @Query("FROM Assessment as assess WHERE assess.status <> 'DELETED' AND assess.title=:title")
    Assessment findAssessmentByTitle(String title);
    @Query(value = "select * from quiz_set where tag=:id and company_id=:cid and difficulty=:df and status<>'DELETED' order by created_on desc",nativeQuery = true)
    List<Assessment> findByTagAndDifficulty(@Param("id") Integer tagId,@Param("df") String difficulty,@Param("cid")Integer companyId);
    @Query("FROM Assessment  as assess WHERE assess.status <> 'DELETED' AND assess.topicId=:topic order by assess.createdOn desc")
    List<Assessment> findAssessmentByTopicId(Topic topic, Pageable pageable);
    @Query("SELECT assess FROM Assessment as assess WHERE ( assess.title like :searchString OR assess.description like :searchString OR assess.category like :searchString ) AND assess.company =:company AND assess.topicId =:topic AND assess.status <> 'DELETED'")
    List<Assessment> searchAssessment(String searchString, Company company, Topic topic,Pageable pageable);


}