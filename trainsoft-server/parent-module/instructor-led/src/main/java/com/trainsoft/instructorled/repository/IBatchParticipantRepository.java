package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Batch;
import com.trainsoft.instructorled.entity.BatchParticipant;
import com.trainsoft.instructorled.entity.VirtualAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IBatchParticipantRepository extends JpaRepository<BatchParticipant, Integer>{
	BatchParticipant findBatchParticipantBySid(byte[] sid);
	List<BatchParticipant> findBatchParticipantByBatch(Batch batch);
	BatchParticipant findBatchParticipantByBatchAndVirtualAccount(Batch batch,VirtualAccount virtualAccount);
}
