package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.BatchTO;

import java.util.List;

public interface IBatchService {
    BatchTO createBatch(BatchTO batchTO);
    BatchTO updateBatch(BatchTO batchTO);
    BatchTO getBatchBySid(String batchSid);
    List<BatchTO> getBatches();
    boolean deleteBatchBySid(String courseSid,String deletedBySid);
}
