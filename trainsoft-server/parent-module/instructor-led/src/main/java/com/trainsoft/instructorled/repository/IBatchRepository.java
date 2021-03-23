package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IBatchRepository extends JpaRepository<Batch, Integer>{
	Batch findBatchBySid(byte[] sid);
	List<Batch> findBatchesByNameContaining(String name);
}
