package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IAssessmentRepository extends JpaRepository<Assessment,Integer>
{
    @Query(value = "SELECT COUNT(id) FROM Assessment WHERE topicId=:topicId")
    long countByQuizId(@Param("topicId") Topic topicId);
}
