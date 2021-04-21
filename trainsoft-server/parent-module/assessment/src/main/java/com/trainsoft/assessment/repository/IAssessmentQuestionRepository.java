package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.AssessmentQuestion;
import com.trainsoft.assessment.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IAssessmentQuestionRepository extends JpaRepository<AssessmentQuestion, Integer>
{
      List<AssessmentQuestion> getAssessmentQuestionsByTopicId(Topic topic);
}
