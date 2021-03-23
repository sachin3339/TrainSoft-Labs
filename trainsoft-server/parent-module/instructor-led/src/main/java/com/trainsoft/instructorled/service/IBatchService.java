package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.BatchViewTO;

import java.util.List;

public interface IBatchService {
    BatchTO createBatch(BatchTO batchTO);
    BatchTO updateBatch(BatchTO batchTO);
    BatchTO getBatchBySid(String batchSid);
    List<BatchTO> getBatches();
    boolean deleteBatchBySid(String batchSid,String deletedBySid);
    List<BatchTO> getBatchesByName(String name);
    List<BatchViewTO> getBatchesWithPagination(int pageNo, int pageSize);
    boolean deleteParticipantsByBatchSid(String batchSid, String  vASid);

}
