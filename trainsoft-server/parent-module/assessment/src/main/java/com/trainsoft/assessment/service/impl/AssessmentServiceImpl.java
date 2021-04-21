package com.trainsoft.assessment.service.impl;

import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.customexception.InvalidSidException;
import com.trainsoft.assessment.customexception.RecordNotFoundException;
import com.trainsoft.assessment.dozer.DozerUtils;
import com.trainsoft.assessment.entity.*;
import com.trainsoft.assessment.repository.*;
import com.trainsoft.assessment.repository.IAssessmentRepository;
import com.trainsoft.assessment.repository.ITopicRepository;
import com.trainsoft.assessment.repository.IVirtualAccountRepository;
import com.trainsoft.assessment.service.IAssessmentService;
import com.trainsoft.assessment.to.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;
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
    private final IAnswerRepository answerRepository;
    private final IVirtualAccountHasQuestionAnswerDetailsRepository virtualAccountHasQuestionAnswerDetailsRepository;
    private final ICategoryRepository iCategoryRepository;

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

    @Override
    public AssessmentTo getInstructionsForAssessment(InstructionsRequestTO instructionsRequestTO) {
        VirtualAccount virtualAccount=virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(instructionsRequestTO.getCreatedBySid()));
        if (virtualAccount==null) throw new InvalidSidException("invalid Virtual Account Sid.");
        Category category = iCategoryRepository.findBySid(BaseEntity.hexStringToByteArray(instructionsRequestTO.getCategorySid()));
        if (category==null) throw new InvalidSidException("Invalid Category Sid.");
        Assessment assessment= assessmentRepository.findByCategoryAndDifficulty(virtualAccount.getId(),
                category.getId(),instructionsRequestTO.getDifficulty());
        return mapper.convert(assessment,AssessmentTo.class);
    }

    @Override
    public List<AssessmentQuestionTo> startAssessment(String quizSetSid) {
        Assessment assessment = assessmentRepository
                .findBySid(BaseEntity.hexStringToByteArray(quizSetSid));
        if (assessment!=null){
            List<AssessmentQuestion> assessmentQuestionList = assessmentQuestionRepository.findByTopicId(assessment.getId());
            List<AssessmentQuestionTo> assessmentQuestionTo=new ArrayList<>();
            assessmentQuestionList.forEach(as->{
                List<Answer> answer = answerRepository.findAnswerByQuestionId(as.getQuestionId().getId());
                AssessmentQuestionTo assessTo= new AssessmentQuestionTo();
                assessTo.setSid(as.getStringSid());
                assessTo.setStatus(as.getStatus());
                assessTo.setQuestionId(as.getQuestionId());
                assessTo.setCompanySid(as.getCompany().getStringSid());
                assessTo.getQuestionId().setAnswers(answer);
                assessTo.setQuestionNumber(as.getQuestionNumber());
                assessTo.setTopicSid(as.getTopicId().getStringSid());
                assessTo.setVirtualAccountSid(as.getCreatedBy().getStringSid());
                assessTo.setQuestionPoint(as.getQuestionPoint());
                assessTo.setQuestionNumber(as.getQuestionNumber());
                assessTo.setAnswerRandomize(as.isAnswerRandomize());
                assessmentQuestionTo.add(assessTo);
            });
            return assessmentQuestionTo;
        }throw new InvalidSidException("invalid Quiz Set Sid.");
    }

    @Override
    public VirtualAccountHasQuestionAnswerDetailsTO submitAnswer(VirtualAccountHasQuestionAnswerDetailsTO request) {
        VirtualAccountHasQuestionAnswerDetails virtualAccountHasQuestionAnswerDetails = new VirtualAccountHasQuestionAnswerDetails();
        virtualAccountHasQuestionAnswerDetails.setSid(BaseEntity.generateByteUuid());
        virtualAccountHasQuestionAnswerDetails.setVirtualAccountId(request.getVirtualAccountId());
        virtualAccountHasQuestionAnswerDetails.setQuestionId(request.getQuestionId());
        virtualAccountHasQuestionAnswerDetails.setAnswer(request.getAnswer());
        virtualAccountHasQuestionAnswerDetails.setCompanyId(request.getCompanyId());
        virtualAccountHasQuestionAnswerDetails.setCreatedBy(request.getCreatedBy());
        virtualAccountHasQuestionAnswerDetails.setCorrect(request.isCorrect());
        virtualAccountHasQuestionAnswerDetails.setCreatedOn(request.getCreatedOn());
        virtualAccountHasQuestionAnswerDetailsRepository.save(virtualAccountHasQuestionAnswerDetails);
        return mapper.convert(virtualAccountHasQuestionAnswerDetails,VirtualAccountHasQuestionAnswerDetailsTO.class);
    }

    @Override
    public List<VirtualAccountHasQuestionAnswerDetailsTO> reviewQuestionsAndAnswers(String virtualAccountSid) {
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(virtualAccountSid));
        if (virtualAccount!=null){
            List<VirtualAccountHasQuestionAnswerDetails> virtualAccountHasQuestionAnswerDetails = virtualAccountHasQuestionAnswerDetailsRepository
                    .findByVirtualAccountId(virtualAccount.getId());
            mapper.convertList(virtualAccountHasQuestionAnswerDetails,VirtualAccountHasQuestionAnswerDetailsTO.class);
        }
        return null;
    }
}