package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.BatchViewTO;
import com.trainsoft.instructorled.to.UserTO;

import java.util.List;

public interface IBatchService {
    BatchTO createBatch(BatchTO batchTO);
    BatchTO updateBatch(BatchTO batchTO);
    BatchTO getBatchBySid(String batchSid);
    List<BatchTO> getBatches(String companySid);
    boolean deleteBatchBySid(String batchSid,String deletedBySid);
    List<BatchTO> getBatchesByName(String name,String companySid);
    List<BatchViewTO> getBatchesWithPagination(int pageNo, int pageSize,String companySid);
    boolean deleteParticipantsByBatchSid(String batchSid, String  vASid);
    UserTO createSingleUserWithBatch(String batchSid, String VASid, String companySid);

}
