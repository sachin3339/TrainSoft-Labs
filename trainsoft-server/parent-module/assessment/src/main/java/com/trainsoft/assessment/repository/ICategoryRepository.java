package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ICategoryRepository extends JpaRepository<Category,Integer> {

    @Override
    @Query("FROM Category as cg WHERE cg.status='ENABLED'")
    List<Category> findAll();

    @Query(" FROM Category as cg WHERE cg.sid=:sId AND cg.status='ENABLED'")
    Category findCategoryBySid(byte[] sId);

    Category findBySid(byte [] sid);
}
