package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

@org.springframework.stereotype.Repository
public interface IQuestionRepository extends JpaRepository<Question, Repository> {
    
}
