package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface IAssessmentRepository extends JpaRepository<Assessment,Integer>
{
    Assessment findAssessmentBySid(byte[] assessmentSid);
    Assessment findBySid(byte [] sid);

    @Query(value = "select * from quiz_set where tag=:id and difficulty=:df",nativeQuery = true)
    List<Assessment> findByTagAndDifficulty(@Param("id") Integer tagId,@Param("df") String difficulty);

}
