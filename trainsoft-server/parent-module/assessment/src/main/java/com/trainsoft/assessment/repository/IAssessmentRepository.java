package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
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
    @Query(value = "select * from quiz_set where tag=:id and difficulty=:df and status<>'DELETED'",nativeQuery = true)
    List<Assessment> findByTagAndDifficulty(@Param("id") Integer tagId,@Param("df") String difficulty);
    @Query("FROM Assessment  as assess WHERE assess.status <> 'DELETED' AND assess.topicId=:topic")
    List<Assessment> findAssessmentByTopicId(Topic topic, Pageable pageable);

}
