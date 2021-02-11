package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.BatchParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBatchParticipantRepository extends JpaRepository<BatchParticipant, Integer>{
	BatchParticipant findBatchParticipantBySid(byte[] sid);
}
