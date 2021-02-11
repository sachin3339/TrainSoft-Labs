package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBatchRepository extends JpaRepository<Batch, Integer>{
	Batch findBatchBySid(byte[] sid);
}
