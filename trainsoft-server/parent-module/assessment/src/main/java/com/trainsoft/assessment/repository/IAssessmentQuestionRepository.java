package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.AssessmentQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAssessmentQuestionRepository extends JpaRepository<AssessmentQuestion, Integer>
{

}
