package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.IBatchRepository;
import com.trainsoft.instructorled.repository.ICourseRepository;
import com.trainsoft.instructorled.repository.ICourseSessionRepository;
import com.trainsoft.instructorled.repository.IVirtualAccountRepository;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.service.ICourseService;
import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.CourseSessionTO;
import com.trainsoft.instructorled.to.CourseTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@Service
public class BatchServiceImpl implements IBatchService {
    private IVirtualAccountRepository virtualAccountRepository;
    private IBatchRepository batchRepository;
    private DozerUtils mapper;

    @Override
    public BatchTO createBatch(BatchTO batchTO) {
        try {
            if (batchTO != null) {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                        (BaseEntity.hexStringToByteArray(batchTO.getCreatedByVASid()));
                Batch batch = mapper.convert(batchTO, Batch.class);
                batch.generateUuid();
                batch.setCreatedBy(virtualAccount);
                batch.setUpdatedOn(null);
                batch.setStatus(InstructorEnum.Status.ENABLED);
                batch.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                BatchTO savedBatchTO = mapper.convert(batchRepository.save(batch), BatchTO.class);
                savedBatchTO.setCreatedByVASid(virtualAccount.getStringSid());
                return savedBatchTO;
            } else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while creating the batch");
            throw new ApplicationException("Something went wrong while creating the batch");
        }
    }

    @Override
    public BatchTO updateBatch(BatchTO batchTO) {
        return null;
    }

    @Override
    public BatchTO getBatchBySid(String batchSid) {
        BatchTO batchTO=null;
        Batch batch = batchRepository.findBatchBySid(BaseEntity.hexStringToByteArray(batchSid));
        try {
            if (!StringUtils.isEmpty(batchSid) && batch != null){
                batchTO = mapper.convert(batch, BatchTO.class);
                batchTO.setCreatedByVASid(batch.getCreatedBy() == null ? null : batch.getCreatedBy().getStringSid());
                batchTO.setUpdatedByVASid(batch.getUpdatedBy() == null ? null : batch.getUpdatedBy().getStringSid());
            return batchTO;
        }else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while fetching the batch details by sid");
            throw new ApplicationException("Something went wrong while fetching the batch details by sid");
        }
    }

    @Override
    public List<BatchTO> getBatches() {
        try {
            List<Batch> batches = batchRepository.findAll();
            return batches.stream().map(batch->{
                BatchTO to= mapper.convert(batch, BatchTO.class);
                to.setCreatedByVASid(batch.getCreatedBy()==null?null:batch.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(batch.getUpdatedBy()==null?null:batch.getUpdatedBy().getStringSid());
                return to;
            }).collect(Collectors.toList());
        }catch (Exception e) {
            log.info("throwing exception while fetching the all batch details");
            throw new ApplicationException("Something went wrong while fetching the batch details");
        }
    }

    @Override
    public boolean deleteBatchBySid(String courseSid, String deletedBySid) {
        return false;
    }


}
