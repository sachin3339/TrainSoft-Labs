package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.AssessmentQuestion;
import com.trainsoft.assessment.entity.Question;
import com.trainsoft.assessment.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface IAssessmentQuestionRepository extends JpaRepository<AssessmentQuestion, Integer>
{
      List<AssessmentQuestion> getAssessmentQuestionsByAndAssessmentId(Assessment assessmentId);
      @Query(value = "select * from quiz_set_has_question where quiz_set_id=:id",nativeQuery = true)
      List<AssessmentQuestion> findByTopicId(@Param("id") Integer quizSetId);
      Optional<AssessmentQuestion> findAssessmentQuestionByQuestionId(Question question);
      Integer countAssessmentQuestionByAssessmentId(Assessment assessmentId);

      @Query(value = "select sum(question_point) total_marks from quiz_set_has_question where quiz_set_id=:id",nativeQuery = true)
      Integer findTotalMarksForAQuizSet(@Param("id") Integer quizSetId);

      @Query(value = "select count(*)total_question from quiz_set_has_question where quiz_set_id=:id",nativeQuery = true)
      Integer findTotalQuestion(@Param("id") Integer quizSetId);
}