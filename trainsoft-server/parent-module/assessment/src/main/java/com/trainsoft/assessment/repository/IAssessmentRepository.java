package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IAssessmentRepository extends JpaRepository<Assessment,Integer>
{
    Assessment findAssessmentBySid(byte[] assessmentSid);
}
