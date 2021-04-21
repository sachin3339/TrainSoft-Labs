package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.QuizSetHasQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IQuizSetHasQuestionRepository extends JpaRepository {

    QuizSetHasQuestion findBySid(byte [] sid);
    List<QuizSetHasQuestion> findByQuizSetId(Integer quizSetId);
}
