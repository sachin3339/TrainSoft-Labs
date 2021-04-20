package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.QuizSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IQuizSetRepository extends JpaRepository<QuizSet,Integer> {

    @Query(value = "select * from quiz_set where created_by=:cby and company_id=:cid and category=:id and difficulty=:type",nativeQuery = true)
    QuizSet findByCategoryAndDifficulty(@Param("cby") Integer createdBy,@Param("cid") Integer companyId,@Param("id") Integer
            categoryId, @Param("type") String difficulty);
}
