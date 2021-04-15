package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.to.*;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
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
    private ICompanyRepository companyRepository;
    IBatchParticipantRepository batchParticipantRepository;
    IDepartmentVirtualAccountRepository departmentVARepo;

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
                batch.setCompany(getCompany(batchTO.getCompanySid()));
                BatchTO savedBatchTO = mapper.convert(batchRepository.save(batch), BatchTO.class);
                savedBatchTO.setCreatedByVASid(virtualAccount.getStringSid());
                return savedBatchTO;
            } else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while creating the batch",e.toString());
            throw new ApplicationException("Something went wrong while creating the batch");
        }
    }
    private Company getCompany(String companySid){
        Company c=companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        Company company=new Company();
        company.setId(c.getId());
        return company;
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
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while updating the batch",e.toString());
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
                batchTO.setCompanySid(batch.getCompany() == null ? null : batch.getCompany().getStringSid());
            return batchTO;
        }else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while fetching the batch details by sid",e.toString());
            throw new ApplicationException("Something went wrong while fetching the batch details by sid");
        }
    }

    @Override
    public List<BatchTO> getBatches(String companySid) {
        try {
            List<Batch> batches = batchRepository.findAllByCompany(getCompany(companySid))
                    .stream().filter(c->c.getStatus()!= InstructorEnum.Status.DELETED)
                    .collect(Collectors.toList());
            return batches.stream().map(batch->{
                BatchTO to= mapper.convert(batch, BatchTO.class);
                to.setCreatedByVASid(batch.getCreatedBy()==null?null:batch.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(batch.getUpdatedBy()==null?null:batch.getUpdatedBy().getStringSid());
                to.setCompanySid(batch.getCompany()==null?null:batch.getCompany().getStringSid());
                return to;
            }).collect(Collectors.toList());
        }catch (Exception e) {
            log.error("throwing exception while fetching the all batch details",e.toString());
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
                // it should be having different column to update deleted by
                batch.setUpdatedBy(virtualAccount);
                batch.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                batchRepository.save(batch);
                log.info(String.format("Batch %s is deleted successfully by %s",batchSid, deletedBySid));
                return true;
            } else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while deleting the Batch details by sid",e.toString());
            throw new ApplicationException("Something went wrong while deleting the Batch details by sid");
        }
    }

    @Override
    public List<BatchTO> getBatchesByName(String name,String companySid) {
        try {
            List<Batch> batchList= batchRepository.findBatchesByNameContainingAndCompany(name,getCompany(companySid));
            return mapper.convertList(batchList,BatchTO.class);
        }catch (Exception e) {
            log.error("throwing exception while fetching the Batches details by name",e.toString());
            throw new ApplicationException("Something went wrong while fetching the Batches details by name ");
        }
    }

    @Override
    public List<BatchViewTO> getBatchesWithPagination(int pageNo, int pageSize,String companySid) {
        try {
            Pageable paging = PageRequest.of(pageNo, pageSize);
            Page<BatchView> pagedResult = batchViewRepository.findAllByCompanySidAndStatusNot(companySid,InstructorEnum.Status.DELETED,paging);
            List<BatchView> batchViewList = pagedResult.toList();
            return batchViewList.stream().map(batch->{
                BatchViewTO to= mapper.convert(batch, BatchViewTO.class);
                to.setCreatedByVASid(batch.getCreatedBy()==null?null:batch.getCreatedBy());
                to.setUpdatedByVASid(batch.getUpdatedBy()==null?null:batch.getUpdatedBy());
                to.setCompanySid(batch.getCompanySid()==null?null:batch.getCompanySid());
                return to;
            }).collect(Collectors.toList());
        }catch (Exception e) {
            log.error("throwing exception while fetching the all batch details with learners",e.toString());
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
                throw new RecordNotFoundException("No record found");
        } catch (Exception exception) {
            log.error("throwing exception while deleting the BatchParticipants details by batch and VASid", exception.toString());
            throw new ApplicationException("Something went wrong while deleting the BatchParticipants details by batch and VASid");
        }
    }

    public List<UserTO> createMultipleUserWithBatch(String batchSid, List<String> VASid,String companySid) {

        if (StringUtils.isNotEmpty(batchSid) && StringUtils.isNotEmpty(companySid) && VASid!=null && VASid.size()>0) {
            Batch batch = batchRepository.findBatchBySid(BaseEntity.hexStringToByteArray(batchSid));
         List<VirtualAccount> virtualAccounts=saveVirtualAccountBatch(batch,VASid,getCompany(companySid));
            return mapper.convertList(virtualAccounts,UserTO.class);
        } else {
            log.error("throwing exception while associating  the user with batch");
            throw new RecordNotFoundException("No record found with given Sid");
        }
    }

    private List<VirtualAccount> saveVirtualAccountBatch(Batch batch, List<String> vASids, Company company) {
        List<VirtualAccount> virtualAccountList= new ArrayList<>();
        vASids.forEach(vASid-> {
            VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySidAndCompanyAndStatusNot(
                       BaseEntity.hexStringToByteArray(vASid),company, InstructorEnum.Status.DELETED);
            BatchParticipant  batchParticipant = new BatchParticipant();
            batchParticipant.generateUuid();
            batchParticipant.setBatch(batch);
            batchParticipant.setVirtualAccount(virtualAccount);
            batchParticipantRepository.save(batchParticipant);
            virtualAccountList.add(virtualAccount);
        });
        return virtualAccountList;
    }

/*    @Override
    public List<UserTO> getActiveVirtualAccountWithBatch(){

        List<VirtualAccount> virtualAccounts= customRepository.findActiveVA();
        return mapper.convertList(virtualAccounts,UserTO.class);
    }*/

     @Override
    public List<UserTO> getActiveVirtualAccountWithBatch(String batchSid,String companySid) {
        List<VirtualAccount> virtualAccounts= new ArrayList<>();
        Batch batch = batchRepository.findBatchBySid(BaseEntity.hexStringToByteArray(batchSid));
       List<BatchParticipant> participants= batchParticipantRepository.findBatchParticipantByBatch(batch);
       List<VirtualAccount> virtualAccountList=virtualAccountRepository.findVirtualAccountByCompanyAndStatus(getCompany(companySid), InstructorEnum.Status.ENABLED);
         if(virtualAccountList!=null && virtualAccountList.size()>0) {
             virtualAccountList.forEach(virtualAccount -> {
                 participants.forEach(participant -> {
                     if (participant.getId() != virtualAccount.getId())
                         virtualAccounts.add(virtualAccount);
                 });
             });
         }
        return mapper.convertList(virtualAccounts,UserTO.class);
    }
}
