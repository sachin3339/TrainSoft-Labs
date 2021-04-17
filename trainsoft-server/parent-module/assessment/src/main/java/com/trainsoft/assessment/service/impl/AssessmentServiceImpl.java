package com.trainsoft.assessment.service.impl;

import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.customexception.RecordNotFoundException;
import com.trainsoft.assessment.dozer.DozerUtils;
import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.BaseEntity;
import com.trainsoft.assessment.entity.Topic;
import com.trainsoft.assessment.entity.VirtualAccount;
import com.trainsoft.assessment.repository.IAssessmentRepository;
import com.trainsoft.assessment.repository.ITopicRepository;
import com.trainsoft.assessment.repository.IVirtualAccountRepository;
import com.trainsoft.assessment.service.IAssessmentService;
import com.trainsoft.assessment.to.AssessmentTo;
import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Slf4j
@AllArgsConstructor
@Service
public class AssessmentServiceImpl implements IAssessmentService
{

    private final IVirtualAccountRepository virtualAccountRepository;
    private final DozerUtils mapper;
    private final IAssessmentRepository assessmentRepository;
    private final ITopicRepository topicRepository;

    @Override
    public AssessmentTo createAssessment(AssessmentTo assessmentTo)
    {
        try
        {
            if (assessmentTo != null)
            {
                // get Virtual Account
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                        (BaseEntity.hexStringToByteArray(assessmentTo.getCreatedByVirtualAccountSid()));
                Assessment assessment=mapper.convert(assessmentTo, Assessment.class);
                assessment.generateUuid();
                assessment.setCreatedBy(virtualAccount);
                assessment.setCompany(virtualAccount.getCompany());
                assessment.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                assessment.setTopicId(topicRepository.findTopicBySid
                        (BaseEntity.hexStringToByteArray(assessmentTo.getTopicSid())));
                AssessmentTo savedAssessmentTo=mapper.convert(assessmentRepository.save(assessment),AssessmentTo.class);
                return savedAssessmentTo;
            }
            else
            throw new RecordNotFoundException("Record not saved");
        }catch (Exception exp)
        {
            log.error("throwing exception while creating the Assessment", exp.toString());
            throw new ApplicationException("Something went wrong while creating the Assessment" + exp.getMessage());
        }
    }
}
