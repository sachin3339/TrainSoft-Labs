package com.trainsoft.assessment.service.impl;

import com.trainsoft.assessment.commons.CommonUtils;
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
    private final ICompanyRepository companyRepository;
    private final IVirtualAccountHasQuizSetSessionTimingRepository virtualAccountHasQuizSetSessionTimingRepository;
    private final ITagRepository tagRepository;
    private final IVirtualAccountHasQuizSetAssessmentRepository virtualAccountHasQuizSetAssessmentRepository;
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
               // Topic topic = topicRepository.findTopicBySid(BaseEntity.hexStringToByteArray(assessmentQuestionTo.getTopicSid()));
                Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentQuestionTo.getAssessmentSid()));
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
                    assessmentQuestion.setAssessmentId(assessment);
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
    public List<AssessmentTo> getInstructionsForAssessment(InstructionsRequestTO request) {
        Tag tag = tagRepository.findBySid(BaseEntity.hexStringToByteArray(request.getTagSid()));
        if (tag==null) throw new InvalidSidException("invalid Tag Sid");
       List<Assessment> assessment= assessmentRepository.findByTagAndDifficulty(tag.getId(),request.getDifficulty());
        return mapper.convertList(assessment,AssessmentTo.class);
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
                AssessmentQuestionTo assessTo = new AssessmentQuestionTo();
                assessTo.setSid(as.getStringSid());
                assessTo.setStatus(as.getStatus());
                assessTo.setQuestionPoint(as.getQuestionPoint());
                assessTo.setQuestionId(mapper.convert(as.getQuestionId(),QuestionTo.class));
                assessTo.getQuestionId().setAnswer(mapper.convertList(answer,AnswerTo.class));
                assessTo.setAnswerRandomize(as.isAnswerRandomize());
                assessTo.setCompanySid(mapper.convert(as.getCompany(),CompanyTO.class).getSid());
                assessTo.setVirtualAccountSid(mapper.convert(as.getCreatedBy(),VirtualAccountTO.class).getSid());
                assessTo.setQuestionNumber(as.getQuestionNumber());
                assessTo.setAssessmentSid(mapper.convert(as.getAssessmentId(),TopicTo.class).getSid());
                assessmentQuestionTo.add(assessTo);
            });
            VirtualAccountHasQuizSetSessionTiming virtualAccountHasQuizSetSessionTiming = new VirtualAccountHasQuizSetSessionTiming();
            virtualAccountHasQuizSetSessionTiming.generateUuid();
           // virtualAccountHasQuizSetSessionTiming.setVirtualAccountId();
            virtualAccountHasQuizSetSessionTiming.setQuizSetId(assessment);
            virtualAccountHasQuizSetSessionTiming.setQuizId(assessment.getTopicId());
            virtualAccountHasQuizSetSessionTiming.setStartTime(new Date());
           // virtualAccountHasQuizSetSessionTiming.setEndTime();
            virtualAccountHasQuizSetSessionTiming.setCompanyId(assessment.getCompany());
            virtualAccountHasQuizSetSessionTimingRepository.save(virtualAccountHasQuizSetSessionTiming);
            return assessmentQuestionTo;
        }throw new InvalidSidException("invalid Quiz Set Sid.");
    }

    @Override
    public VirtualAccountHasQuestionAnswerDetailsTO submitAnswer(SubmitAnswerRequestTO request) {
        VirtualAccountHasQuestionAnswerDetails virtualAccountHasQuestionAnswerDetails = new VirtualAccountHasQuestionAnswerDetails();
        virtualAccountHasQuestionAnswerDetails.generateUuid();
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(request.getVirtualAccountSid()));
        if (virtualAccount!=null) virtualAccountHasQuestionAnswerDetails.setVirtualAccountId(virtualAccount);
        Question question = questionRepository.findQuestionBySid(BaseEntity.hexStringToByteArray(request.getQuestionSid()));
        if (question!=null)virtualAccountHasQuestionAnswerDetails.setQuestionId(question);
        virtualAccountHasQuestionAnswerDetails.setAnswer(CommonUtils.toJsonFunction.apply(request.getAnswer()));
        Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(request.getCompanySid()));
        if (company!=null)virtualAccountHasQuestionAnswerDetails.setCompanyId(company);
        VirtualAccount virtualAccount2 = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(request.getCreatedBySid()));
        if (virtualAccount2!=null) virtualAccountHasQuestionAnswerDetails.setCreatedBy(virtualAccount2);
        Answer answer = answerRepository.findCorrectAnswer(question.getId());
        if (answer!=null && answer.getAnswerOption().equals(request.getAnswer()))
            virtualAccountHasQuestionAnswerDetails.setCorrect(true);
        virtualAccountHasQuestionAnswerDetails.setCreatedOn(new Date(request.getCreatedOn()));
        virtualAccountHasQuestionAnswerDetailsRepository.save(virtualAccountHasQuestionAnswerDetails);
        VirtualAccountHasQuestionAnswerDetailsTO vTo = new VirtualAccountHasQuestionAnswerDetailsTO();
        vTo.setSid(virtualAccountHasQuestionAnswerDetails.getStringSid());
        vTo.setVirtualAccountSid(mapper.convert(virtualAccountHasQuestionAnswerDetails.getVirtualAccountId(),VirtualAccountTO.class).getSid());
        vTo.setQuestionSid(mapper.convert(virtualAccountHasQuestionAnswerDetails.getQuestionId(),QuestionTo.class).getSid());
        vTo.setCompanySid(mapper.convert(virtualAccountHasQuestionAnswerDetails.getCompanyId(),CompanyTO.class).getSid());
        vTo.setAnswer(virtualAccountHasQuestionAnswerDetails.getAnswer());
        vTo.setCorrect(virtualAccountHasQuestionAnswerDetails.isCorrect());
        vTo.setCreatedBySid(mapper.convert(virtualAccountHasQuestionAnswerDetails.getCreatedBy(),VirtualAccountTO.class).getSid());
        vTo.setCreatedOn(virtualAccountHasQuestionAnswerDetails.getCreatedOn());
        return vTo;
    }

    @Override
    public List<VirtualAccountHasQuestionAnswerDetailsTO> reviewQuestionsAndAnswers(String virtualAccountSid) {
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(virtualAccountSid));
        if (virtualAccount!=null){
            List<VirtualAccountHasQuestionAnswerDetails> virtualAccountHasQuestionAnswerDetails = virtualAccountHasQuestionAnswerDetailsRepository
                    .findByVirtualAccountId(virtualAccount.getId());
           return mapper.convertList(virtualAccountHasQuestionAnswerDetails,VirtualAccountHasQuestionAnswerDetailsTO.class);
        }
        throw new InvalidSidException("invalid virtual account sid.");
    }

    private Integer[] findCountsForAssessmentGiven(Integer quizSetId,Integer virtualAccountId){
        Integer[] integers = new Integer[5];
        Integer totalMarks= assessmentQuestionRepository.findTotalMarksForAQuizSet(quizSetId);
        Integer totalQuestion = assessmentQuestionRepository.findTotalQuestion(quizSetId);
        Integer correctAnswers = virtualAccountHasQuestionAnswerDetailsRepository.findCountOfCorrectAnswers(virtualAccountId);
        Integer wrongAnswers = virtualAccountHasQuestionAnswerDetailsRepository.findCountOfWrongAnswers(virtualAccountId);
        Integer attemptedQuestions = virtualAccountHasQuestionAnswerDetailsRepository.findCountsOfAttemptedQuestions(virtualAccountId);
        integers[0]=totalQuestion;
        integers[1]=totalMarks;
        integers[3]=correctAnswers;
        integers[4]=wrongAnswers;
        integers[5]=attemptedQuestions;
        return integers;
    }



    @Override
    public VirtualAccountHasQuizSetAssessmentTO submitAssessment(SubmitAssessmentTO request) {
        VirtualAccountHasQuizSetAssessment virtualAccountHasQuizSetAssessment = new VirtualAccountHasQuizSetAssessment();
        virtualAccountHasQuizSetAssessment.generateUuid();
        Topic topic = topicRepository.findTopicBySid(BaseEntity.hexStringToByteArray(request.getQuizSid()));
        if (topic!=null)virtualAccountHasQuizSetAssessment.setQuizId(topic);
        Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(request.getQuizSetSid()));
        if (assessment!=null) virtualAccountHasQuizSetAssessment.setQuizSetId(assessment);
        Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(request.getCompanySid()));
        if (company!=null) virtualAccountHasQuizSetAssessment.setCompanyId(company);
        VirtualAccount virtualAccount1 = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(request.getCreatedBySid()));
        if (virtualAccount1!=null)virtualAccountHasQuizSetAssessment.setCreatedBy(virtualAccount1);
        virtualAccountHasQuizSetAssessment.setCreatedOn(new Date(request.getCreatedOn()));
        VirtualAccount virtualAccount2= virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(request.getUpdatedBySid()));
        if (virtualAccount2!=null)virtualAccountHasQuizSetAssessment.setUpdatedBy(virtualAccount2);
        virtualAccountHasQuizSetAssessment.setUpdatedOn(new Date(request.getUpdatedOn()));
        VirtualAccount virtualAccount3 = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(request.getVirtualAccountSid()));
        if (virtualAccount3!=null)virtualAccountHasQuizSetAssessment.setVirtualAccountId(virtualAccount3);
        Integer[] counts = findCountsForAssessmentGiven(assessment.getId(), virtualAccount3.getId());
            virtualAccountHasQuizSetAssessment.setTotalMarks(counts[0]);
            virtualAccountHasQuizSetAssessment.setTotalNumberOfCorrectAnswer(counts[3]);
            virtualAccountHasQuizSetAssessment.setTotalNumberOfWrongAnswer(counts[4]);
            virtualAccountHasQuizSetAssessment.setNumberOfAttemptedQuestion(counts[5]);
        List<VirtualAccountHasQuestionAnswerDetails> list = virtualAccountHasQuestionAnswerDetailsRepository.findListOfCorrectResponse(virtualAccount3.getId());
        Integer gainMarks=0;
        for (VirtualAccountHasQuestionAnswerDetails va:list){
            gainMarks=gainMarks+va.getQuestionPoint();
        }
        virtualAccountHasQuizSetAssessment.setGainMarks(gainMarks);
       virtualAccountHasQuizSetAssessmentRepository.save(virtualAccountHasQuizSetAssessment);
      return   mapper.convert(virtualAccountHasQuizSetAssessment,VirtualAccountHasQuizSetAssessmentTO.class);
    }


}