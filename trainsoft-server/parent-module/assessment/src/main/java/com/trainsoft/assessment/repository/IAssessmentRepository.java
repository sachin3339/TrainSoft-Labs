package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface IAssessmentRepository extends JpaRepository<Assessment,Integer>
{
    Assessment findAssessmentBySid(byte[] assessmentSid);
    Assessment findBySid(byte [] sid);

    @Query(value = "select * from quiz_set where created_by=:cby and category=:id and difficulty=:type",nativeQuery = true)
    Assessment findByCategoryAndDifficulty(@Param("cby") Integer createdBy,@Param("id") Integer
            categoryId, @Param("type") String difficulty);

}
