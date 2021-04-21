package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IQuestionTypeRepository extends JpaRepository<QuestionType,Integer> {

    List<QuestionType> findAll();
}
