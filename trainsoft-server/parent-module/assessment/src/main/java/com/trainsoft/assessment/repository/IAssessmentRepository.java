package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface IAssessmentRepository extends JpaRepository<Assessment,Integer>
{

}
