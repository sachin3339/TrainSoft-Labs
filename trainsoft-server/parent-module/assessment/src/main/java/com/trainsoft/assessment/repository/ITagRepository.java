package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITagRepository extends JpaRepository<Tag, Integer> {
   Tag findBySid(byte [] sid);
}
