package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category,Integer>
{

}
