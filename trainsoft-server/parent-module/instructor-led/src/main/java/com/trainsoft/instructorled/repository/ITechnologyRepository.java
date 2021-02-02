package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITechnologyRepository extends JpaRepository<Technology, Integer>{
	Technology findTechnologyBySid(byte[] sid);
}
