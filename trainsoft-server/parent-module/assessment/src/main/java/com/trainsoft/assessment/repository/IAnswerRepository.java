package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IAnswerRepository extends JpaRepository<Answer,Integer> {
    @Query(value = "select * from answer where question_id=:id and status<>'DELETED' order by created_on desc",nativeQuery = true)
    List<Answer> findAnswerByQuestionId(@Param("id") Integer questionId);

    @Query(value = "select * from answer where is_correct=true and question_id=:id and status<>'DELETED'",nativeQuery = true)
    Answer findCorrectAnswer(@Param("id") Integer questionId);
}
