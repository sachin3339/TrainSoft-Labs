package com.trainsoft.assessment.service.impl;

import com.trainsoft.assessment.commons.CustomRepositoryImpl;
import com.trainsoft.assessment.commons.JWTTokenTO;
import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.customexception.InvalidSidException;
import com.trainsoft.assessment.customexception.RecordNotFoundException;
import com.trainsoft.assessment.dozer.DozerUtils;
import com.trainsoft.assessment.entity.*;
import com.trainsoft.assessment.repository.ICompanyRepository;
import com.trainsoft.assessment.repository.ITopicRepository;
import com.trainsoft.assessment.repository.ITrainsoftCustomRepository;
import com.trainsoft.assessment.repository.IVirtualAccountRepository;
import com.trainsoft.assessment.service.ITopicService;
import com.trainsoft.assessment.to.TopicTo;
import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Slf4j
@AllArgsConstructor
@Service
public class TopicServiceImpl implements ITopicService {

     private  final IVirtualAccountRepository virtualAccountRepository;
     private  final  DozerUtils mapper;
     private  final ITopicRepository topicRepository;
     private  final ICompanyRepository companyRepository;
     private final ITrainsoftCustomRepository customRepository;



    @Override
    public TopicTo createTopic(TopicTo topicTo)
    {
        try {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                        (BaseEntity.hexStringToByteArray(topicTo.getCreatedByVirtualAccountSid()));
                Topic topic = mapper.convert(topicTo, Topic.class);
                topic.generateUuid();
                topic.setCreatedBy(virtualAccount);
                topic.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                topic.setStatus(AssessmentEnum.Status.ENABLED);
                topic.setCompany(virtualAccount.getCompany());
                return mapper.convert(topicRepository.save(topic), TopicTo.class);
        }catch (Exception e) {
            log.error("throwing exception while creating the Topic", e.toString());
            throw new ApplicationException("Something went wrong while creating the Topic, please check Topic name may be duplicate: "+e.getMessage());
        }
    }

    @Override
    public List<TopicTo> getAllTopics(String companySid, Pageable pageable)
    {
        try {
            List<Topic> topics = topicRepository.findTopicByCompany(getCompany(companySid),pageable);
            List<TopicTo> topicToList = mapper.convertList(topics, TopicTo.class);
            if (CollectionUtils.isNotEmpty(topics))
            {
                Iterator<Topic> topicIterator=topics.stream().iterator();
                Iterator<TopicTo> topicToIterator=topicToList.stream().iterator();
                while(topicIterator.hasNext() && topicToIterator.hasNext())
                {
                    topicToIterator.next().setNoOfAssessments(topicIterator.next().getAssessments().size());
                }
                return topicToList;
            }
            else
                throw new RecordNotFoundException("Record not found");
        }catch (Exception exp)
        {
            log.error("throwing exception while getting all Topics", exp.toString());
            throw new ApplicationException("Something went wrong while getting all Topics" + exp.getMessage());
        }
    }

    @Override
    public TopicTo updateTopic(String topicSid,String topicName)
    {
            Topic topic = topicRepository.findTopicBySid(BaseEntity.hexStringToByteArray(topicSid));
            if(topic!=null)
            {
                topic.setName(topicName);
                return mapper.convert(topicRepository.save(topic),TopicTo.class);
            }
           else {
                log.error("Invalid Topic Sid:" + topicSid);
                throw new InvalidSidException("Invalid Topic Sid: " + topicSid);
            }
    }

    @Override
    public TopicTo softDeleteTopic(String topicSid)
    {
        if(topicSid!=null)
        {
            Topic topic = topicRepository.findTopicBySid(BaseEntity.hexStringToByteArray(topicSid));
            if(topic!=null && CollectionUtils.isEmpty(topic.getAssessments()))
            {
                topic.setStatus(AssessmentEnum.Status.DELETED);
                return mapper.convert(topicRepository.save(topic), TopicTo.class);
            }
            else
                throw new ApplicationException("Topic does not exist OR Contains Assessments , which cannot be Deleted until related Assessments are deleted");
        }
        else throw new InvalidSidException("Invalid Topic Sid !");
    }


    private Company getCompany(String companySid){
        Company c=companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        Company company=new Company();
        company.setId(c.getId());
        return company;
    }

    @Override
    public List<TopicTo> searchTopic(String searchString, String companySid) {
        Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        if (company!=null){
            List<Topic> topic = customRepository.searchTopic(searchString.trim(), company);
           return mapper.convertList(topic,TopicTo.class);
        }
        throw new InvalidSidException("invalid company Sid");
    }

}
