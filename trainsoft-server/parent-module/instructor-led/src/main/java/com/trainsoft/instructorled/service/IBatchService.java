package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.BatchTO;

public interface IBatchService {
    BatchTO createBatch(BatchTO batchTO);
    BatchTO updateBatch(BatchTO batchTO);
    BatchTO getBatchBySid(String batchSid);
    boolean deleteBatchBySid(String courseSid,String deletedBySid);
}
