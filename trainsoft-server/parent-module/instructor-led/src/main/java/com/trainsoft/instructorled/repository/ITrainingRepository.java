package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITrainingRepository extends JpaRepository<Training, Integer>{
	Training findTrainingBySid(byte[] sid);
}
