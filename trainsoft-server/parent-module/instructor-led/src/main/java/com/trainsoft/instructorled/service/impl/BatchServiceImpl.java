package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.service.ICourseService;
import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.BatchViewTO;
import com.trainsoft.instructorled.to.CourseSessionTO;
import com.trainsoft.instructorled.to.CourseTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import javassist.bytecode.stackmap.BasicBlock;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private IBatchViewRepository batchViewRepository;
    private ITrainsoftCustomRepository customRepository;
    private  IBatchParticipantRepository participantRepository;
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
        try {
            if(StringUtils.isNotEmpty(batchTO.getSid())){
                Batch batch= batchRepository.findBatchBySid(BaseEntity.hexStringToByteArray(batchTO.getSid()));
                VirtualAccount virtualAccount= virtualAccountRepository.findVirtualAccountBySid(
                        BaseEntity.hexStringToByteArray(batchTO.getUpdatedByVASid()));
                batch.setName(batchTO.getName());
                batch.setTrainingType(batchTO.getTrainingType());
                batch.setStatus(batchTO.getStatus());
                batch.setUpdatedBy(virtualAccount);
                batch.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                BatchTO savedBatch=mapper.convert(batchRepository.save(batch),BatchTO.class);
                savedBatch.setUpdatedByVASid(virtualAccount.getStringSid());
                return savedBatch;
            }else
                throw new RecordNotFoundException();
        } catch (Exception e)
        {
            log.info("throwing exception while updating the batch");
            throw new ApplicationException("Something went wrong while updating the batch");
        }

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
            List<Batch> batches = batchRepository.findAll()
                    .stream().filter(c->c.getStatus()!= InstructorEnum.Status.DELETED)
                    .collect(Collectors.toList());
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
    public boolean deleteBatchBySid(String batchSid, String deletedBySid) {
        Batch batch = batchRepository.findBatchBySid(BaseEntity.hexStringToByteArray(batchSid));
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                (BaseEntity.hexStringToByteArray(deletedBySid));
        try {
            if (!StringUtils.isEmpty(batchSid) && batch != null) {
                batch.setStatus(InstructorEnum.Status.DELETED);
                batch.setUpdatedBy(virtualAccount);
                batch.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                batchRepository.save(batch);
                log.info(String.format("Batch %s is deleted successfully by %s",batchSid, deletedBySid));
                return true;
            } else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while deleting the Batch details by sid");
            throw new ApplicationException("Something went wrong while deleting the Batch details by sid");
        }
    }

    @Override
    public List<BatchTO> getBatchesByName(String name) {
        try {
            List<Batch> batchList= batchRepository.findBatchesByNameContaining(name);
            return mapper.convertList(batchList,BatchTO.class);
        }catch (Exception e)
        {
            log.info("throwing exception while fetching the Batches details by name");
            throw new ApplicationException("Something went wrong while fetching the Batches details by name ");
        }
    }

    @Override
    public List<BatchViewTO> getBatchesWithPagination(int pageNo, int pageSize) {
        try {
            Pageable paging = PageRequest.of(pageNo, pageSize);
            Page<BatchView> pagedResult = batchViewRepository.findAllByStatusNot(InstructorEnum.Status.DELETED,paging);
            List<BatchView> batchViewList = pagedResult.toList();
            return batchViewList.stream().map(batch->{
                BatchViewTO to= mapper.convert(batch, BatchViewTO.class);
                to.setCreatedByVASid(batch.getCreatedBy()==null?null:batch.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(batch.getUpdatedBy()==null?null:batch.getUpdatedBy().getStringSid());
                return to;
            }).collect(Collectors.toList());
        }catch (Exception e) {
            log.info("throwing exception while fetching the all batch details with learners");
            throw new ApplicationException("Something went wrong while fetching the batch details with learners");
        }
    }

    @Override
    public boolean deleteParticipantsByBatchSid(String batchSid, String vASid) {
        try {
            if (!StringUtils.isEmpty(batchSid) && !StringUtils.isEmpty(vASid)) {
                Batch batch = batchRepository.findBatchBySid(BaseEntity.hexStringToByteArray(batchSid));
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(vASid));
                BatchParticipant participant= participantRepository.findBatchParticipantByBatchAndVirtualAccount(batch, virtualAccount);
                participantRepository.delete(participant);
                return true;
            } else
                throw new RecordNotFoundException();
        } catch (Exception exception) {
            log.info("throwing exception while deleting the BatchParticipants details by batch and VASid");
            throw new ApplicationException("Something went wrong while deleting the BatchParticipants details by batch and VASid");
        }
    }
}
