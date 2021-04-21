package com.trainsoft.assessment.service.impl;

import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.customexception.RecordNotFoundException;
import com.trainsoft.assessment.dozer.DozerUtils;
import com.trainsoft.assessment.entity.*;
import com.trainsoft.assessment.repository.*;
import com.trainsoft.assessment.service.IAssessmentService;
import com.trainsoft.assessment.to.AssessmentQuestionTo;
import com.trainsoft.assessment.to.AssessmentTo;
import com.trainsoft.assessment.to.CategoryTo;
import com.trainsoft.assessment.to.QuestionTo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.math3.analysis.function.Exp;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Slf4j
@AllArgsConstructor
@Service
public class AssessmentServiceImpl implements IAssessmentService
{

    private final IVirtualAccountRepository virtualAccountRepository;
    private final DozerUtils mapper;
    private final IAssessmentRepository assessmentRepository;
    private final ITopicRepository topicRepository;
    private final ICategoryRepository categoryRepository;
    private final IQuestionRepository questionRepository;
    private final IAssessmentQuestionRepository assessmentQuestionRepository;

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
               return mapper.convert(assessmentRepository.save(assessment),AssessmentTo.class);
            }
            else
            throw new RuntimeException("Record not saved");
        }catch (Exception exp)
        {
            log.error("throwing exception while creating the Assessment", exp.toString());
            throw new ApplicationException("Something went wrong while creating the Assessment" + exp.getMessage());
        }
    }

    @Override
    public List<CategoryTo> getAllCategories()
    {
        try {
            List<Category> categoryList = categoryRepository.findAll();
            if (CollectionUtils.isNotEmpty(categoryList)) {
                List<CategoryTo> categoryToList = mapper.convertList(categoryList, CategoryTo.class);
                Iterator<Category> categoryIterator = categoryList.iterator();
                Iterator<CategoryTo> categoryToIterator = categoryToList.iterator();
                while (categoryIterator.hasNext() && categoryToIterator.hasNext()) {
                    categoryToIterator.next().setTags(categoryIterator.next().getTags());
                }
                return categoryToList;
            }
            return Collections.EMPTY_LIST;
        }catch (Exception exp)
        {
            log.error("throwing exception while getting all Categories", exp.toString());
            throw new ApplicationException("Something went wrong while getting all Categories" + exp.getMessage());
        }
    }

    @Override
    public List<AssessmentTo> getAssessmentsByTopic(String topicSid)
    {
       Topic topic=topicRepository.findTopicBySid(BaseEntity.hexStringToByteArray(topicSid));
       if(topic!=null)
       {
          List<Assessment> assessmentList = topic.getAssessments();
          if(CollectionUtils.isNotEmpty(assessmentList))
          {
              List<AssessmentTo> assessmentToList = mapper.convertList(assessmentList,AssessmentTo.class);
              assessmentToList.forEach(assessmentTo ->
              {
                  assessmentTo.setTopicSid(BaseEntity.bytesToHexStringBySid(topic.getSid()));
              });
              return assessmentToList;
          }
       }
           return Collections.EMPTY_LIST;
    }

    @Override
    public List<QuestionTo> associateSelectedQuestionsToAssessment(AssessmentQuestionTo assessmentQuestionTo)
    {
        try {
            if (assessmentQuestionTo != null) {
                List<Question> questionList = new ArrayList<>();
                for (String questionSid : assessmentQuestionTo.getQuestionSidList()) {
                    questionList.add(questionRepository.findQuestionBySid(BaseEntity.hexStringToByteArray(questionSid)));
                }
                Topic topic = topicRepository.findTopicBySid(BaseEntity.hexStringToByteArray(assessmentQuestionTo.getTopicSid()));
                //get Virtual Account
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                        (BaseEntity.hexStringToByteArray(assessmentQuestionTo.getVirtualAccountSid()));

                List<AssessmentQuestion> assessmentQuestionList = new ArrayList<>();
                questionList.forEach(question -> {
                    AssessmentQuestion assessmentQuestion = new AssessmentQuestion();
                    assessmentQuestion.generateUuid();
                    assessmentQuestion.setCreatedBy(virtualAccount);
                    assessmentQuestion.setCompany(virtualAccount.getCompany());
                    assessmentQuestion.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                    assessmentQuestion.setQuestionId(question);
                    assessmentQuestion.setTopicId(topic);
                    assessmentQuestionList.add(assessmentQuestion);
                });
                List<AssessmentQuestion> savedAssessmentQuestions = assessmentQuestionRepository.saveAll(assessmentQuestionList);
                Set<Question> questionSet = new HashSet<>();
                if (CollectionUtils.isNotEmpty(savedAssessmentQuestions)) {
                    savedAssessmentQuestions.forEach(savedAssessmentQuestion -> {
                        questionSet.add(savedAssessmentQuestion.getQuestionId());
                    });
                    questionList = new ArrayList<>(questionSet);
                }
                return mapper.convertList(questionList, QuestionTo.class);
            }
            return Collections.EMPTY_LIST;
        }catch (Exception exp)
        {
            log.error("throwing exception while associating questions to Assessments", exp.toString());
            throw new ApplicationException("Something went wrong while associating questions to Assessment" + exp.getMessage());

        }
    }

    @Override
    public AssessmentTo getAssessmentBySid(String assessmentSid) {
        try {
            if (assessmentSid != null) {
                Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentSid));
                return mapper.convert(assessment, AssessmentTo.class);
            } else
                throw new RecordNotFoundException("No records found");
        } catch (Exception exp) {
            log.error("throwing exception while fetching Assessment with Sid :{}",assessmentSid,exp.toString());
            throw new ApplicationException("Something went wrong while fetching Assessment" + exp.getMessage());
        }
    }

    @Override
    public List<QuestionTo> getAssessmentQuestionsBySid(String assessmentSid) {
        try {
            if (assessmentSid != null) {
                Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentSid));
                List<AssessmentQuestion> assessmentQuestionList = assessmentQuestionRepository.getAssessmentQuestionsByTopicId(assessment.getTopicId());
                List<Question> questionList = new ArrayList<>();
                if(CollectionUtils.isNotEmpty(assessmentQuestionList))
                {
                    for (AssessmentQuestion assessmentQuestion:assessmentQuestionList)
                    {
                      questionList.add(assessmentQuestion.getQuestionId());
                    }

                    if(CollectionUtils.isNotEmpty(questionList))
                    {
                        return  mapper.convertList(questionList,QuestionTo.class);
                    }
                }
                return Collections.EMPTY_LIST;
            } else
                throw new RecordNotFoundException("No records found");
        } catch (Exception exp) {
            log.error("throwing exception while fetching Assessment Questions",exp.toString());
            throw new ApplicationException("Something went wrong while fetching Assessment Questions" + exp.getMessage());
        }
    }
}