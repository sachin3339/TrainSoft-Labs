package com.trainsoft.assessment.service.impl;

import com.trainsoft.assessment.commons.CommonUtils;
import com.trainsoft.assessment.commons.Utility;
import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.customexception.DuplicateRecordException;
import com.trainsoft.assessment.customexception.FunctionNotAllowedException;
import com.trainsoft.assessment.customexception.InvalidSidException;
import com.trainsoft.assessment.customexception.RecordNotFoundException;
import com.trainsoft.assessment.dozer.DozerUtils;
import com.trainsoft.assessment.entity.*;
import com.trainsoft.assessment.enums.QuizStatus;
import com.trainsoft.assessment.repository.*;
import com.trainsoft.assessment.repository.IAssessmentRepository;
import com.trainsoft.assessment.repository.ITopicRepository;
import com.trainsoft.assessment.repository.IVirtualAccountRepository;
import com.trainsoft.assessment.service.IAssessmentService;
import com.trainsoft.assessment.to.*;
import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.math.BigInteger;
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
    private final ICompanyRepository companyRepository;
    private final IVirtualAccountHasQuizSetSessionTimingRepository virtualAccountHasQuizSetSessionTimingRepository;
    private final ITagRepository tagRepository;
    private final IVirtualAccountHasQuizSetAssessmentRepository virtualAccountHasQuizSetAssessmentRepository;
    private final ITrainsoftCustomRepository customRepository;
    private final IAppUserRepository appUserRepository;
    private final IVirtualAccountAssessmentRepository virtualAccountAssessmentRepository;
    private final String defaultCompanySid="87EABA4D52D54638BE304F5E0C05577FB1F809AA22B94F0F8D11FFCA0D517CAC";

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
                if(isDuplicateAssessment(assessment))
                {
                    log.error("Record already exist with the same name:"+assessment.getTitle());
                    throw new DuplicateRecordException("Duplicate record will not be created");
                }
                assessment.generateUuid();
                assessment.setCreatedBy(virtualAccount);
                assessment.setCompany(virtualAccount.getCompany());
                assessment.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                assessment.setTopicId(topicRepository.findTopicBySid
                        (BaseEntity.hexStringToByteArray(assessmentTo.getTopicSid())));
                assessment.setCategoryId(categoryRepository.findCategoryBySid(BaseEntity.hexStringToByteArray(assessmentTo.getCategorySid())));
                assessment.setTagId(tagRepository.findBySid(BaseEntity.hexStringToByteArray(assessmentTo.getTagSid())));
                AssessmentTo savedAssessmentTo = mapper.convert(assessmentRepository.save(assessment),AssessmentTo.class);
                savedAssessmentTo.setCompanySid(assessment.getStringSid());
                savedAssessmentTo.setTagSid(assessmentTo.getTagSid());
                savedAssessmentTo.setTopicSid(assessmentTo.getTopicSid());
                savedAssessmentTo.setCategorySid(assessmentTo.getCategorySid());
                return savedAssessmentTo;
            }
            else
            throw new RuntimeException("Record not saved");
        }catch (Exception exp)
        {
            if(exp instanceof DuplicateRecordException)
            {
                throw new ApplicationException(((DuplicateRecordException) exp).devMessage);
            }
            log.error("throwing exception while creating the Assessment", exp.toString());
            throw new ApplicationException("Something went wrong while creating the Assessment" + exp.getMessage());
        }
    }

    private boolean isDuplicateAssessment(Assessment assessment)
    {
        Assessment existingAssessment=assessmentRepository.findAssessmentByTitle(assessment.getTitle().trim());
        return existingAssessment != null && existingAssessment.getTitle().equalsIgnoreCase(assessment.getTitle());
    }

    @Override
    public List<CategoryTO> getAllCategories()
    {
            List<Category> categoryList = categoryRepository.findAll();
            if (CollectionUtils.isNotEmpty(categoryList)) {
               return mapper.convertList(categoryList, CategoryTO.class);
            }
            else throw new RecordNotFoundException("No records found");
    }

    @Override
    public List<AssessmentTo> getAssessmentsByTopic(String topicSid,Pageable pageable)
    {
            Topic topic = topicRepository.findTopicBySid(BaseEntity.hexStringToByteArray(topicSid));
            if (topic!=null)
            {
                List<Assessment> assessmentList = assessmentRepository.findAssessmentByTopicId(topic,pageable);
                if (CollectionUtils.isNotEmpty(assessmentList)) {
                    List<AssessmentTo> assessmentToList = mapper.convertList(assessmentList, AssessmentTo.class);
                    Iterator<AssessmentTo> assessmentToIterator=assessmentToList.stream().iterator();
                    Iterator<Assessment> assessmentIterator= assessmentList.stream().iterator();
                    String tSid = BaseEntity.bytesToHexStringBySid(topic.getSid());
                    while (assessmentIterator.hasNext() && assessmentToIterator.hasNext())
                    {
                         AssessmentTo assessmentTo = assessmentToIterator.next();
                         Assessment assessment = assessmentIterator.next();

                         assessmentTo.setTopicSid(tSid);
                         assessmentTo.setNoOfQuestions(getNoOfQuestionByAssessmentSid(BaseEntity.bytesToHexStringBySid(assessment.getSid())));
                         assessmentTo.setTagSid(assessment.getTagId().getStringSid());
                    }
                    return assessmentToList;
                }
                log.warn("No Assessments are present for this Topic");
                return Collections.EMPTY_LIST;
            }
            throw new InvalidSidException("Invalid Topic Sid.");
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
                    assessmentQuestion.setQuestionPoint(question.getQuestionPoint());
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
                AssessmentTo assessmentTo= mapper.convert(assessment, AssessmentTo.class);
                assessmentTo.setTagSid(assessment.getTagId().getStringSid());
                assessmentTo.setCategorySid(assessment.getCategoryId().getStringSid());
                assessmentTo.setNoOfQuestions(getNoOfQuestionByAssessmentSid(assessmentSid));
                assessmentTo.setTopicSid(assessment.getTopicId().getStringSid());
                assessmentTo.setCompanySid(assessment.getCompany().getStringSid());
                return assessmentTo;
            } else
                throw new RecordNotFoundException("No records found");
        } catch (Exception exp) {
            log.error("throwing exception while fetching Assessment with Sid :{}",assessmentSid,exp.toString());
            throw new ApplicationException("Something went wrong while fetching Assessment" + exp.getMessage());
        }
    }

    @Override
    public List<QuestionTo> getAssessmentQuestionsBySid(String assessmentSid, Pageable pageable) {
        try {
            if (assessmentSid != null) {
                Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentSid));
                List<AssessmentQuestion> assessmentQuestionList = assessmentQuestionRepository.getAssessmentQuestionsByAssessmentIdOrderByCreatedOnDesc(assessment,pageable);
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
                throw new InvalidSidException("Assessment Sid is Invalid");
        } catch (Exception exp) {
            log.error("throwing exception while fetching Assessment Questions",exp.toString());
            throw new ApplicationException("Something went wrong while fetching Assessment Questions" + exp.getMessage());
        }
    }

    private Integer getNoOfQuestionByAssessmentSid(String assessmentSid)
    {
        if(assessmentSid!=null)
        {
            Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentSid));
            return assessmentQuestionRepository.countAssessmentQuestionByAssessmentId(assessment);
        }
        throw new InvalidSidException("Invalid Assessment Sid");
    }

    @Override
    public AssessmentTo getInstructionsForAssessment(InstructionsRequestTO request) {
        Tag tag = tagRepository.findBySid(BaseEntity.hexStringToByteArray(request.getTagSid()));
        List<Assessment> assessment=null;
        ArrayList<Assessment> assessments = new ArrayList<>();
        if (tag!=null && request.getCompanySid()==null){
            Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(defaultCompanySid));
             assessment= assessmentRepository
                    .findByTagAndDifficulty(tag.getId(),request.getDifficulty(),company.getId());
            assessment.forEach(as->{
                Integer noOfQuestion = getNoOfQuestionByAssessmentSid(as.getStringSid());
                if (noOfQuestion>=1) assessments.add(as);
            });
            if (assessments.size()==0) throw new RecordNotFoundException("No Assessment Found.");
            Assessment assessment1 = assessments.get(new Random().nextInt(assessments.size()));
            AssessmentTo assessmentTo = mapper.convert(assessment1, AssessmentTo.class);
            assessmentTo.setTopicSid(assessment1.getTopicId().getStringSid());
            assessmentTo.setTagSid(assessment1.getTagId().getStringSid());
            assessmentTo.setNoOfQuestions(getNoOfQuestionByAssessmentSid(assessment1.getStringSid()));
            if (assessment1.getUpdatedBy()!=null)assessmentTo.setUpdatedBySid(assessment1.getUpdatedBy().getStringSid());
            if (assessment1.getUpdatedOn()!=null)assessmentTo.setUpdatedOn(assessment1.getUpdatedOn());
            assessmentTo.setCompanySid(assessment1.getCompany().getStringSid());
            assessmentTo.setCreatedByVirtualAccountSid(assessment1.getCreatedBy().getStringSid());
            return assessmentTo;
        }
        if (tag!=null && request.getCompanySid()!=null){
            Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(request.getCompanySid()));
            if (company==null)throw new InvalidSidException("invalid company sid");
            assessment= assessmentRepository
                    .findByTagAndDifficulty(tag.getId(),request.getDifficulty(),company.getId());
            assessment.forEach(as->{
                Integer noOfQuestion = getNoOfQuestionByAssessmentSid(as.getStringSid());
                if (noOfQuestion>=1) assessments.add(as);
            });
            Assessment assessment1 = assessments.get(new Random().nextInt(assessments.size()));
            AssessmentTo assessmentTo = mapper.convert(assessment1, AssessmentTo.class);
            assessmentTo.setTopicSid(assessment1.getTopicId().getStringSid());
            assessmentTo.setTagSid(assessment1.getTagId().getStringSid());
            assessmentTo.setNoOfQuestions(getNoOfQuestionByAssessmentSid(assessment1.getStringSid()));
            if (assessment1.getUpdatedBy()!=null)assessmentTo.setUpdatedBySid(assessment1.getUpdatedBy().getStringSid());
            if (assessment1.getUpdatedOn()!=null)assessmentTo.setUpdatedOn(assessment1.getUpdatedOn());
            assessmentTo.setCompanySid(assessment1.getCompany().getStringSid());
            assessmentTo.setCreatedByVirtualAccountSid(assessment1.getCreatedBy().getStringSid());
            return assessmentTo;
        }
        throw new InvalidSidException("invalid tag sid.");
    }

    @Override
    public List<AssessmentQuestionTo> startAssessment(String quizSetSid,String virtualAccountSid) {
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(virtualAccountSid));
        if (virtualAccount==null) throw new InvalidSidException("Invalid virtual Account Sid.");
        VirtualAccountHasQuizSetSessionTiming virtualAccountHasQuizSetSessionTiming1 = virtualAccountHasQuizSetSessionTimingRepository
                .findByVirtualAccountId(virtualAccount.getId());
        if (virtualAccountHasQuizSetSessionTiming1!=null)
            throw new FunctionNotAllowedException("you already have started your assessment or your assessment is submitted already.");
        Assessment assessment = assessmentRepository
                .findBySid(BaseEntity.hexStringToByteArray(quizSetSid));
        if (assessment!=null){
            virtualAccountAssessmentRepository.updateStatus(QuizStatus.STARTED,virtualAccount,assessment);
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
                assessTo.setCompanySid(as.getCompany().getStringSid());
                assessTo.setVirtualAccountSid(as.getCreatedBy().getStringSid());
                assessTo.setQuestionNumber(as.getQuestionNumber());
                assessTo.setAssessmentSid(as.getAssessmentId().getStringSid());
                assessmentQuestionTo.add(assessTo);
            });
            VirtualAccountHasQuizSetSessionTiming virtualAccountHasQuizSetSessionTiming = new VirtualAccountHasQuizSetSessionTiming();
            virtualAccountHasQuizSetSessionTiming.generateUuid();
                virtualAccountHasQuizSetSessionTiming.setVirtualAccountId(virtualAccount);
            virtualAccountHasQuizSetSessionTiming.setQuizSetId(assessment);
            virtualAccountHasQuizSetSessionTiming.setQuizId(assessment.getTopicId());
            virtualAccountHasQuizSetSessionTiming.setStartTime(new Date());
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
        Answer answer = answerRepository
                .findBySidAndQuestionIdAndCorrect(BaseEntity.hexStringToByteArray(request.getAnswerSid()));
        AnswerTo answerTo = mapper.convert(answer, AnswerTo.class);
        virtualAccountHasQuestionAnswerDetails.setAnswer(CommonUtils.toJsonFunction.apply(answerTo));
        Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(request.getQuizSetSid()));
        if (assessment==null)throw new InvalidSidException("invalid Quiz set Sid");
            virtualAccountHasQuestionAnswerDetails.setCompanyId(assessment.getCompany());
            virtualAccountHasQuestionAnswerDetails.setCreatedBy(assessment.getCreatedBy());
            virtualAccountHasQuestionAnswerDetails.setCreatedOn(assessment.getCreatedOn());
        if (answer!=null && answer.isCorrect()==true) virtualAccountHasQuestionAnswerDetails.setCorrect(true);
        Integer questionPoint = questionRepository.findQuestionPoint(question.getId());
        virtualAccountHasQuestionAnswerDetails.setQuestionPoint(questionPoint);
        virtualAccountHasQuestionAnswerDetailsRepository.save(virtualAccountHasQuestionAnswerDetails);
        VirtualAccountHasQuestionAnswerDetailsTO vTo = new VirtualAccountHasQuestionAnswerDetailsTO();
        vTo.setSid(virtualAccountHasQuestionAnswerDetails.getStringSid());
        vTo.setVirtualAccountSid(virtualAccountHasQuestionAnswerDetails.getVirtualAccountId().getStringSid());
        vTo.setQuestionSid(virtualAccountHasQuestionAnswerDetails.getQuestionId().getStringSid());
        vTo.setCompanySid(virtualAccountHasQuestionAnswerDetails.getCompanyId().getStringSid());
        vTo.setAnswer(virtualAccountHasQuestionAnswerDetails.getAnswer());
        vTo.setCorrect(virtualAccountHasQuestionAnswerDetails.isCorrect());
        vTo.setCreatedBySid(virtualAccountHasQuestionAnswerDetails.getCreatedBy().getStringSid());
        vTo.setCreatedOn(virtualAccountHasQuestionAnswerDetails.getCreatedOn());
        vTo.setQuestionPoint(virtualAccountHasQuestionAnswerDetails.getQuestionPoint());
        return vTo;
        
    }

    @Override
    public List<VirtualAccountHasQuestionAnswerDetailsTO> reviewQuestionsAndAnswers(String virtualAccountSid) {
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(virtualAccountSid));
        if (virtualAccount!=null){
            ArrayList<VirtualAccountHasQuestionAnswerDetailsTO> virtualAccountHasQuestionAnswerDetailsTO = new ArrayList<>();
            List<VirtualAccountHasQuestionAnswerDetails> virtualAccountHasQuestionAnswerDetails = virtualAccountHasQuestionAnswerDetailsRepository
                    .findByVirtualAccountId(virtualAccount.getId());
            virtualAccountHasQuestionAnswerDetails.forEach(vd->{
                VirtualAccountHasQuestionAnswerDetailsTO vTo = new VirtualAccountHasQuestionAnswerDetailsTO();
                vTo.setSid(vd.getStringSid());
                vTo.setVirtualAccountSid(vd.getVirtualAccountId().getStringSid());
                vTo.setQuestionSid(vd.getQuestionId().getStringSid());
                vTo.setAnswer(vd.getAnswer());
                vTo.setCompanySid(vd.getCompanyId().getStringSid());
                vTo.setCreatedBySid(vd.getCreatedBy().getStringSid());
                vTo.setCreatedOn(vd.getCreatedOn());
                vTo.setQuestionPoint(vd.getQuestionPoint());
                vTo.setCorrect(vd.isCorrect());
                virtualAccountHasQuestionAnswerDetailsTO.add(vTo);
            });
          return virtualAccountHasQuestionAnswerDetailsTO;
        }
        throw new InvalidSidException("invalid virtual account sid.");
    }

    private Integer[] findCountsForAssessmentGiven(Integer quizSetId,Integer virtualAccountId){
        Integer[] counts = new Integer[5];
        Integer totalMarks= assessmentQuestionRepository.findTotalMarksForAQuizSet(quizSetId);
        Integer totalQuestion = assessmentQuestionRepository.findTotalQuestion(quizSetId);
        Integer correctAnswers = virtualAccountHasQuestionAnswerDetailsRepository.findCountOfCorrectAnswers(virtualAccountId);
        Integer wrongAnswers = virtualAccountHasQuestionAnswerDetailsRepository.findCountOfWrongAnswers(virtualAccountId);
        Integer attemptedQuestions = virtualAccountHasQuestionAnswerDetailsRepository.findCountsOfAttemptedQuestions(virtualAccountId);
        counts[0]=totalQuestion;
        counts[1]=totalMarks;
        counts[2]=correctAnswers;
        counts[3]=wrongAnswers;
        counts[4]=attemptedQuestions;
        return counts;
    }


    @Override
    public VirtualAccountHasQuizSetAssessmentTO submitAssessment(SubmitAssessmentTO request) {
        VirtualAccount virtualAccount = virtualAccountRepository
                .findVirtualAccountBySid(BaseEntity.hexStringToByteArray(request.getVirtualAccountSid()));
        if (virtualAccount==null) throw new InvalidSidException("invalid virtual Account Sid");
       VirtualAccountHasQuizSetAssessment checkEntry= virtualAccountHasQuizSetAssessmentRepository
               .findByVirtualAccountId(virtualAccount.getId());
       if (checkEntry!=null)throw new FunctionNotAllowedException("you have already submitted your Assessment.");
        VirtualAccountHasQuizSetAssessment virtualAccountHasQuizSetAssessment = new VirtualAccountHasQuizSetAssessment();
        virtualAccountHasQuizSetAssessment.generateUuid();
        Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(request.getQuizSetSid()));
        if (assessment==null) throw new InvalidSidException("Invalid Quiz Set Sid");
            virtualAccountHasQuizSetAssessment.setQuizSetId(assessment);
            virtualAccountHasQuizSetAssessment.setCategoryId(assessment.getCategoryId());
            virtualAccountHasQuizSetAssessment.setCompanyId(assessment.getCompany());
            virtualAccountHasQuizSetAssessment.setQuizId(assessment.getTopicId());
            virtualAccountHasQuizSetAssessment.setCreatedBy(assessment.getCreatedBy());
            virtualAccountHasQuizSetAssessment.setCreatedOn(assessment.getCreatedOn());
            if (virtualAccountHasQuizSetAssessment.getUpdatedBy()!=null) virtualAccountHasQuizSetAssessment
                    .setUpdatedBy(assessment.getUpdatedBy());
            if (virtualAccountHasQuizSetAssessment.getUpdatedOn()!=null) virtualAccountHasQuizSetAssessment
                    .setUpdatedOn(assessment.getUpdatedOn());
        virtualAccountHasQuizSetAssessment.setVirtualAccountId(virtualAccount);
        Integer[] counts = findCountsForAssessmentGiven(assessment.getId(), virtualAccount.getId());
            virtualAccountHasQuizSetAssessment.setTotalNumberOfQuestions(counts[0]);
            virtualAccountHasQuizSetAssessment.setTotalMarks(counts[1]);
            virtualAccountHasQuizSetAssessment.setTotalNumberOfCorrectAnswer(counts[2]);
            virtualAccountHasQuizSetAssessment.setTotalNumberOfWrongAnswer(counts[3]);
            virtualAccountHasQuizSetAssessment.setNumberOfAttemptedQuestion(counts[4]);
        List<VirtualAccountHasQuestionAnswerDetails> list = virtualAccountHasQuestionAnswerDetailsRepository
                .findListOfCorrectResponse(virtualAccount.getId());
        Integer gainMarks=0;
        for (VirtualAccountHasQuestionAnswerDetails va:list)
            gainMarks=gainMarks+va.getQuestionPoint();
        virtualAccountHasQuizSetAssessment.setGainMarks(gainMarks);
        virtualAccountHasQuizSetAssessment.setSubmittedOn(new Date());
       virtualAccountHasQuizSetAssessmentRepository.save(virtualAccountHasQuizSetAssessment);
       virtualAccountHasQuizSetSessionTimingRepository.setEndTimeForAssessment(virtualAccount.getId());
        VirtualAccountHasQuizSetAssessment virtualAccountHasQuizSetAssessment1 = virtualAccountHasQuizSetAssessmentRepository
                .findByVirtualAccountId(virtualAccount.getId());
        Integer gainMarks1 = virtualAccountHasQuizSetAssessment1.getGainMarks();
        Integer totalMarks = virtualAccountHasQuizSetAssessment1.getTotalMarks();
        double percentage=((double)gainMarks1*100/(double)totalMarks );
        virtualAccountHasQuizSetAssessment1.setPercentage(percentage);
        virtualAccountHasQuizSetAssessmentRepository.save(virtualAccountHasQuizSetAssessment1);
        //once assessment submitted setting status in virtual_account_has_assessment to COMPLETED.
        virtualAccountAssessmentRepository.updateStatus(QuizStatus.COMPLETED,virtualAccount,assessment);
        VirtualAccountHasQuizSetAssessmentTO vto = new VirtualAccountHasQuizSetAssessmentTO();
        vto.setSid(virtualAccountHasQuizSetAssessment.getStringSid());
        vto.setQuizSid(assessment.getTopicId().getStringSid());
        vto.setQuizSetSid(assessment.getStringSid());
        vto.setTotalMarks(virtualAccountHasQuizSetAssessment.getTotalMarks());
        vto.setGainMarks(virtualAccountHasQuizSetAssessment.getGainMarks());
        vto.setTotalNumberOfCorrectAnswer(virtualAccountHasQuizSetAssessment.getTotalNumberOfCorrectAnswer());
        vto.setTotalNumberOfWrongAnswer(virtualAccountHasQuizSetAssessment.getTotalNumberOfWrongAnswer());
        vto.setNumberOfAttemptedQuestion(virtualAccountHasQuizSetAssessment.getNumberOfAttemptedQuestion());
        vto.setCompanySid(assessment.getCompany().getStringSid());
        vto.setCreatedOn(virtualAccountHasQuizSetAssessment.getCreatedOn());
        vto.setCreatedBySid(assessment.getCreatedBy().getStringSid());
        if (assessment.getUpdatedBy()!=null) vto.setUpdatedBySid(assessment.getUpdatedBy().getStringSid());
        vto.setUpdatedOn(virtualAccountHasQuizSetAssessment.getUpdatedOn());
        vto.setVirtualAccountSid(virtualAccount.getStringSid());
        vto.setTotalNumberOfQuestions(virtualAccountHasQuizSetAssessment1.getTotalNumberOfQuestions());
        vto.setSubmittedOn(virtualAccountHasQuizSetAssessment1.getSubmittedOn());
        vto.setPercentage(virtualAccountHasQuizSetAssessment1.getPercentage());
        vto.setCategorySid(virtualAccountHasQuizSetAssessment1.getCategoryId().getStringSid());
        return vto;
    }



    @Override
    public String removeAssociatedQuestionFromAssessment(String questionSid,String assessmentSid)
    {
        if(questionSid!=null && assessmentSid!=null)
        {
            Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentSid));
            Question question=questionRepository.findQuestionBySid(BaseEntity.hexStringToByteArray(questionSid));
            Optional<AssessmentQuestion> assessmentQuestion = assessmentQuestionRepository.findAssessmentQuestionByQuestionIdAndAssessmentId(question,assessment);
            if(assessmentQuestion.isPresent())
            {
                assessmentQuestionRepository.delete(assessmentQuestion.get());
                return "Removed associated question successfully";
            }
            else
              throw new ApplicationException("Record not found to delete");
        }
        else throw new InvalidSidException("Invalid Question Sid OR Invalid Assessment Sid");
    }

    @Override
    public String generateAssessmentURL(String assessmentSid, HttpServletRequest request)
    {
        if(assessmentSid!=null)
        {
            Assessment assessment=assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentSid));
            if(assessment!=null) {
                String URL = Utility.getSiteURL(request);
                String generatedUrl = URL.concat("/assessment/"+assessmentSid+"/"+assessment.getCompany().getStringSid())+"/0";
                assessment.setUrl(generatedUrl);
                assessmentRepository.save(assessment);
                return generatedUrl;
            }
            throw new InvalidSidException("Provided Sid is not Valid");
        }
        else throw new InvalidSidException("Assessment Sid is null");
    }

    private Integer[] findRankForToday(Integer quizSetId,Integer virtualAccountId){
        List<VirtualAccountHasQuizSetAssessment> virtualAccountHasQuizSetAssessments = virtualAccountHasQuizSetAssessmentRepository
                .findByAssessmentForCurrentDate(quizSetId);
        Integer[] size = new Integer[virtualAccountHasQuizSetAssessments.size()];
        Map<Double, Integer> idAndPercentageList = new HashMap<>();
        virtualAccountHasQuizSetAssessments.forEach(as->{
            idAndPercentageList.put(as.getPercentage(),as.getVirtualAccountId().getId());
        });
        VirtualAccountHasQuizSetAssessment virtualAccount = virtualAccountHasQuizSetAssessmentRepository
                .findByVirtualAccountId(virtualAccountId);
        int rank=1;
        for (int i=0;i<size.length;i++) {
            size[i]=rank;
            rank++;
        }
        Map<Integer, Integer> assignRank = new HashMap<>();
        int i=0;
        for (VirtualAccountHasQuizSetAssessment va:virtualAccountHasQuizSetAssessments){
            assignRank.put((idAndPercentageList.get(va.getPercentage())), size[i]);
            i++;
        }
        Integer userRank = assignRank.get(virtualAccount.getVirtualAccountId().getId());
        Integer[] data = new Integer[2];
        data[0]=userRank;
        data[1]=virtualAccountHasQuizSetAssessments.size();
        return data;
    }

    private Integer[] findRankForAllTime(Integer quizSetId,Integer virtualAccountId){
        List<VirtualAccountHasQuizSetAssessment> virtualAccountHasQuizSetAssessments = virtualAccountHasQuizSetAssessmentRepository
                .findByAssessment(quizSetId);
        Integer[] size = new Integer[virtualAccountHasQuizSetAssessments.size()];
        Map<Double, Integer> idAndPercentageList = new HashMap<>();
        virtualAccountHasQuizSetAssessments.forEach(as->{
            idAndPercentageList.put(as.getPercentage(),as.getVirtualAccountId().getId());
        });
        VirtualAccountHasQuizSetAssessment virtualAccount = virtualAccountHasQuizSetAssessmentRepository
                .findByVirtualAccountId(virtualAccountId);
        int rank=1;
        for (int i=0;i<size.length;i++) {
            size[i]=rank;
            rank++;
        }
        Map<Integer, Integer> assignRank = new HashMap<>();
        int i=0;
        for (VirtualAccountHasQuizSetAssessment va:virtualAccountHasQuizSetAssessments){
            assignRank.put((idAndPercentageList.get(va.getPercentage())), size[i]);
            i++;
        }
        Integer userRank = assignRank.get(virtualAccount.getVirtualAccountId().getId());
        Integer[] data = new Integer[2];
        data[0]=userRank;
        data[1]=virtualAccountHasQuizSetAssessments.size();
        return data;
    }
    @Override
    public ScoreBoardTO getScoreBoard(String quizSetSid, String virtualAccountSid) {
        ScoreBoardTO scoreBoardTO = new ScoreBoardTO();
        Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(quizSetSid));
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(virtualAccountSid));
        if (assessment!=null && virtualAccount!=null){
            VirtualAccountHasQuizSetAssessment virtualAccountHasQuizSetAssessment = virtualAccountHasQuizSetAssessmentRepository.findByVirtualAccountId(virtualAccount.getId());
            if (virtualAccountHasQuizSetAssessment==null) throw new InvalidSidException(virtualAccount.getStringSid()+ " has not attended any Assessment.");
            scoreBoardTO.setYourScore(virtualAccountHasQuizSetAssessment.getPercentage());
            Integer[] userTodayData = findRankForToday(assessment.getId(), virtualAccount.getId());
            Integer[] userAllTimeData = findRankForAllTime(assessment.getId(),virtualAccount.getId());
            scoreBoardTO.setYourRankToday(userTodayData[0]);
            scoreBoardTO.setTotalAttendeesToday(userTodayData[1]);
            scoreBoardTO.setYourRankAllTime(userAllTimeData[0]);
            scoreBoardTO.setTotalAttendeesAllTime(userAllTimeData[1]);
        }
        return scoreBoardTO;
    }

    @Override
    public List<VirtualAccountHasQuestionAnswerDetailsTO> findUserAssessmentResponses(String virtualAccountSid) {
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(virtualAccountSid));
        ArrayList<VirtualAccountHasQuestionAnswerDetailsTO> virtualAccountHasQuestionAnswerDetailsTO = new ArrayList<>();
        if (virtualAccount!=null) {
            List<VirtualAccountHasQuestionAnswerDetails> virtualAccountHasQuestionAnswerDetails = virtualAccountHasQuestionAnswerDetailsRepository
                    .findVirtualAccountHasQuestionAnswerDetailsByVirtualAccount(virtualAccount.getId());
            virtualAccountHasQuestionAnswerDetails.forEach(vd->{
                VirtualAccountHasQuestionAnswerDetailsTO vTo = new VirtualAccountHasQuestionAnswerDetailsTO();
                vTo.setSid(vd.getStringSid());
                vTo.setVirtualAccountSid(virtualAccount.getStringSid());
                Optional<Question> question = questionRepository.findById(vd.getQuestionId().getId());
                vTo.setQuestionSid(question.get().getStringSid());
                vTo.setQuestionId(mapper.convert(question,QuestionTo.class));
                vTo.getQuestionId().setSid(question.get().getStringSid());
                vTo.getQuestionId().setName(question.get().getName());
                vTo.getQuestionId().setDescription(question.get().getDescription());
                vTo.getQuestionId().setCreatedByVirtualAccountSid(question.get().getCreatedBy().getStringSid());
                vTo.getQuestionId().setTechnologyName(question.get().getTechnologyName());
                vTo.getQuestionId().setQuestionPoint(question.get().getQuestionPoint());
                vTo.getQuestionId().setStatus(question.get().getStatus());
                vTo.getQuestionId().setQuestionType(question.get().getQuestionType());
                vTo.getQuestionId().setDifficulty(question.get().getDifficulty());
                vTo.getQuestionId().setAnswerExplanation(question.get().getAnswerExplanation());
                vTo.getQuestionId().setCompanySid(question.get().getCompany().getStringSid());
                List<Answer> answer = answerRepository.findAnswerByQuestionId(question.get().id);
                vTo.getQuestionId().setAnswer(mapper.convertList(answer,AnswerTo.class));
                vTo.setCorrect(vd.isCorrect());
                vTo.setAnswer(vd.getAnswer());
                vTo.setQuestionPoint(vd.getQuestionPoint());
                Optional<Company> company = companyRepository.findById(vd.getCompanyId().getId());
                vTo.setCompanySid(company.get().getStringSid());
                Optional<VirtualAccount> createdBy = virtualAccountRepository.findById(vd.getCreatedBy().getId());
                vTo.setCreatedBySid(createdBy.get().getStringSid());
                vTo.setCreatedOn(vd.getCreatedOn());
                virtualAccountHasQuestionAnswerDetailsTO.add(vTo);
            });
        }
        return virtualAccountHasQuestionAnswerDetailsTO;
    }

    @Override
    public AssessmentTo updateAssessment(AssessmentTo assessmentTo) {
        Assessment assessment = assessmentRepository
                .findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentTo.getSid()));
        if (assessment==null) throw new InvalidSidException("invalid Quiz Set Sid");
        assessment.setSid(BaseEntity.hexStringToByteArray(assessmentTo.getSid()));
        assessment.setTitle(assessmentTo.getTitle());
        assessment.setDescription(assessmentTo.getDescription());
        VirtualAccount virtualAccount = virtualAccountRepository.
                findVirtualAccountBySid(BaseEntity.hexStringToByteArray(assessmentTo.getUpdatedBySid()));
        assessment.setUpdatedBy(virtualAccount);
        assessment.setUpdatedOn(new Date());
        Tag tag = tagRepository.findBySid(BaseEntity.hexStringToByteArray(assessmentTo.getTagSid()));
        if (tag!=null)assessment.setTagId(tag);
        assessment.setAutoSubmitted(assessmentTo.isAutoSubmitted());
        assessment.setNextEnabled(assessmentTo.isNextEnabled());
        assessment.setDuration(assessmentTo.getDuration());
        assessment.setPremium(assessmentTo.isPremium());
        assessment.setMandatory(assessmentTo.isMandatory());
        assessment.setNegative(assessmentTo.isNegative());
        assessment.setDifficulty(assessmentTo.getDifficulty());
        assessment.setMultipleAttempts(assessmentTo.isMultipleAttempts());
        assessment.setMultipleSitting(assessmentTo.isMultipleSitting());
        assessment.setPauseEnable(assessmentTo.isPauseEnable());
        assessment.setMultipleSitting(assessmentTo.isMultipleSitting());
        Category category = categoryRepository.findBySid(BaseEntity.hexStringToByteArray(assessmentTo.getCategorySid()));
        assessment.setCategoryId(category);
        assessment.setPaymentReceived(assessmentTo.isPaymentReceived());
        assessment.setReduceMarks(assessmentTo.isReduceMarks());
        assessment.setPreviousEnabled(assessmentTo.isPreviousEnabled());
        assessment.setQuestionRandomize(assessmentTo.isQuestionRandomize());
        assessment.setValidUpto(Instant.ofEpochMilli(assessmentTo.getValidUpto()));
        assessment.setUrl(assessmentTo.getUrl());
        assessmentRepository.save(assessment);
        AssessmentTo assessmentTO = mapper.convert(assessment, AssessmentTo.class);
        assessmentTO.setCompanySid(assessment.getCompany().getStringSid());
        assessmentTO.setCreatedByVirtualAccountSid(assessment.getCreatedBy().getStringSid());
        assessmentTO.setTopicSid(assessment.getTopicId().getStringSid());
        assessmentTO.setUpdatedBySid(assessment.getUpdatedBy().getStringSid());
        assessmentTO.setTagSid(assessment.getTagId().getStringSid());
        return assessmentTO;
    }

    @Override
    public void deleteAssessment(String quizSetSid){
        Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(quizSetSid));
        if (assessment==null) throw new InvalidSidException("invalid Quiz Set Sid.");
        assessment.setStatus(AssessmentEnum.Status.DELETED);
        List<AssessmentQuestion> assessmentQuestion = assessmentQuestionRepository.findAssessmentQuestionByAssessmentId(assessment);
        if (!assessmentQuestion.isEmpty()) assessmentQuestionRepository.deleteAll(assessmentQuestion);
        return ;
    }

    @Override
    public BigInteger getCountByClass(String classz, String companySid)
    {
        return customRepository.noOfCountByClass(classz,getCompany(companySid));
    }

    @Override
    public AssessmentDashboardTo getAssessDetails(String assessmentSid)
    {
       Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentSid));
       if(assessment!=null)
       {
           AssessmentDashboardTo assessmentDashboardTo = new AssessmentDashboardTo();
           assessmentDashboardTo.setTotalQuestions(getNoOfQuestionByAssessmentSid(assessmentSid));
           assessmentDashboardTo.setAssessmentStartedOn(assessment.getCreatedOn());
           List<AssessTo> assessToList = new ArrayList<>();
           List<VirtualAccountHasQuizSetAssessment> virtualAccountHasQuizSetAssessmentList
                   = virtualAccountHasQuizSetAssessmentRepository.findByAssessment(assessment.id);
           if(CollectionUtils.isEmpty(virtualAccountHasQuizSetAssessmentList))
               log.error("No one has submitted Assessment :"+assessmentSid);
           int submitted = virtualAccountHasQuizSetAssessmentList.size();
           List<VirtualAccountHasQuizSetSessionTiming> notSubmittedList = virtualAccountHasQuizSetSessionTimingRepository.findByQuizSetId(assessment);
           int notSubmitted = notSubmittedList.size();
           assessmentDashboardTo.setTotalSubmitted(submitted);
           int totalNoOfUsers = virtualAccountAssessmentRepository.getCountByAssessment(assessment);
           assessmentDashboardTo.setTotalUsers(totalNoOfUsers);
           if(totalNoOfUsers>=submitted)
           {
               double attendance = ((double)submitted)/totalNoOfUsers*100;
               if (!Double.isNaN(attendance))
                   assessmentDashboardTo.setAssessAttendance(BigDecimal.valueOf(attendance).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
           }

           // get Assessment submitted assess details
           for (VirtualAccountHasQuizSetAssessment entry : virtualAccountHasQuizSetAssessmentList) {
               VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountById(entry.getVirtualAccountId().id);
               AppUser appUser = appUserRepository.findAppUserById(virtualAccount.getAppuser().id);
               AssessTo assessTo = new AssessTo();
               assessTo.setEmail(appUser.getEmailId());
               assessTo.setName(appUser.getName());
               assessTo.setScore(entry.getPercentage());
               assessTo.setSubmittedOn(entry.getSubmittedOn());
               assessTo.setStatus("SUBMITTED");
               assessToList.add(assessTo);
           }
           assessmentDashboardTo.setBatchAvgScore(batchAverageScore(assessToList));

           // get Assessment not submitted assess details
           for (VirtualAccountHasQuizSetSessionTiming entry : notSubmittedList) {
               VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountById(entry.getVirtualAccountId().id);
               AppUser appUser = appUserRepository.findAppUserById(virtualAccount.getAppuser().id);
               AssessTo assessTo = new AssessTo();
               assessTo.setName(appUser.getName());
               assessTo.setEmail(appUser.getEmailId());
               assessTo.setStatus("PENDING");
               assessToList.add(assessTo);
           }
           assessmentDashboardTo.setAssessToList(assessToList);
           return assessmentDashboardTo;
       }
       log.error("Assessment Sid is null !");
       throw new InvalidSidException("Assessment Sid is null !");
    }

    private Double batchAverageScore(List<AssessTo> assessToList)
    {
        if(CollectionUtils.isNotEmpty(assessToList))
        {
            OptionalDouble score = assessToList.stream().mapToDouble(AssessTo::getScore).average();
            return score.isPresent()? BigDecimal.valueOf(score.getAsDouble()).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue():0.0;
        }
        return null;
    }


    private Company getCompany(String companySid){
        Company company=companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        Company c=new Company();
        c.setId(company.getId());
        return c;
    }

    @Override
    public List<AssessmentTo> searchAssessment(String searchString, String companySid, String topicSid,Pageable pageable)
    {
        Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        Topic topic = topicRepository.findTopicBySid(BaseEntity.hexStringToByteArray(topicSid));
        if (company!=null && topic!=null){
            List<Assessment> assessment = assessmentRepository.searchAssessment("%"+searchString.trim()+"%", company, topic,pageable);
            List<AssessmentTo> assessmentToList = mapper.convertList(assessment, AssessmentTo.class);
            Iterator<Assessment> assessment1 = assessment.stream().iterator();
            Iterator<AssessmentTo> assessmentTo = assessmentToList.stream().iterator();
            while (assessment1.hasNext() && assessmentTo.hasNext()) {
                assessmentTo.next().setNoOfQuestions(getNoOfQuestionByAssessmentSid(assessment1.next().getStringSid()));
            }return assessmentToList;
        }throw new InvalidSidException("invalid Company Sid Or Topic Sid");
    }


    @Override
    public List<AssessTo> getConfiguredUserDetailsForAssessment(String assessmentSid)
    {
        if(assessmentSid!=null)
        {
            Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentSid));
            List<VirtualAccountAssessment> virtualAccountAssessment = virtualAccountAssessmentRepository.findVirtualAccountAssessmentByAssessment(assessment);
            List<AssessTo> assessToList = new ArrayList<>();
            for (VirtualAccountAssessment entry: virtualAccountAssessment)
            {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountById(entry.getVirtualAccount().id);
                AppUser appUser = appUserRepository.findAppUserById(virtualAccount.getAppuser().id);
                AssessTo assessTo = new AssessTo();
                assessTo.setName(appUser.getName());
                assessTo.setEmail(appUser.getEmailId());
                assessTo.setStatus("PENDING");
                assessToList.add(assessTo);
            }
            return assessToList;
        }
        throw new InvalidSidException("Assessment Sid is null");
    }

    @Override
    public List<LeaderBoardRequestTO> getLeaderBoardForAssessmentForToday(String quizSetSid) {
        Assessment assessment = assessmentRepository.findBySid(BaseEntity.hexStringToByteArray(quizSetSid));
        if (assessment!=null){
            ArrayList<LeaderBoardRequestTO> leaderBoardTO = new ArrayList<>();

            List<VirtualAccountHasQuizSetAssessment> topTen = new ArrayList<>();
            List<VirtualAccountHasQuizSetAssessment> assessmentList = virtualAccountHasQuizSetAssessmentRepository
                    .findByAssessmentForCurrentDate(assessment.getId());
            if (assessmentList.size()==0)throw new RecordNotFoundException("no records found");
           if (assessmentList.size()<10){
               for (int i=0;i<assessmentList.size();i++){
                   topTen.add(i,assessmentList.get(i));
               }
               topTen.forEach(tp->{
                   LeaderBoardRequestTO leaderBoardRequestTO = new LeaderBoardRequestTO();
                   leaderBoardRequestTO.setPercentage(tp.getPercentage());
                   leaderBoardRequestTO.setVirtualAccountTO(mapper.convert(tp.getVirtualAccountId(),VirtualAccountTO.class));
                   leaderBoardTO.add(leaderBoardRequestTO);
               });
               return leaderBoardTO;
           }
            for (int i=0;i<10;i++){
                topTen.add(i,assessmentList.get(i));
            }
            topTen.forEach(tp->{
                LeaderBoardRequestTO leaderBoardRequestTO = new LeaderBoardRequestTO();
                leaderBoardRequestTO.setPercentage(tp.getPercentage());
                leaderBoardRequestTO.setVirtualAccountTO(mapper.convert(tp.getVirtualAccountId(),VirtualAccountTO.class));
                leaderBoardTO.add(leaderBoardRequestTO);
            });
         return leaderBoardTO;
        }
        throw new InvalidSidException("invalid Assessment sid");
    }

    @Override
    public List<LeaderBoardRequestTO> getLeaderBoardForAssessmentForAllTime(String quizSetSid) {
        Assessment assessment = assessmentRepository.findBySid(BaseEntity.hexStringToByteArray(quizSetSid));
        if (assessment != null) {
            ArrayList<LeaderBoardRequestTO> leaderBoardTO = new ArrayList<>();
            List<VirtualAccountHasQuizSetAssessment> topTen = new ArrayList<>();
            List<VirtualAccountHasQuizSetAssessment> assessmentList = virtualAccountHasQuizSetAssessmentRepository
                    .findByAssessment(assessment.getId());
            if (assessmentList.size()==0)throw new RecordNotFoundException("no records found");
            if (assessmentList.size()<10){
                for (int i=0;i<assessmentList.size();i++){
                    topTen.add(i,assessmentList.get(i));
                }
                topTen.forEach(tp->{
                    LeaderBoardRequestTO leaderBoardRequestTO = new LeaderBoardRequestTO();
                    leaderBoardRequestTO.setPercentage(tp.getPercentage());
                    leaderBoardRequestTO.setVirtualAccountTO(mapper.convert(tp.getVirtualAccountId(),VirtualAccountTO.class));
                    leaderBoardTO.add(leaderBoardRequestTO);
                });
                return leaderBoardTO;
            }
            for (int i = 0; i < 10; i++) {
                    topTen.add(i, assessmentList.get(i));
            }
            topTen.forEach(tp -> {
                LeaderBoardRequestTO leaderBoardRequestTO = new LeaderBoardRequestTO();
                leaderBoardRequestTO.setPercentage(tp.getPercentage());
                leaderBoardRequestTO.setVirtualAccountTO(mapper.convert(tp.getVirtualAccountId(), VirtualAccountTO.class));
                leaderBoardTO.add(leaderBoardRequestTO);
            });
            return leaderBoardTO;
        } throw new InvalidSidException("invalid Assessment sid");
    }

    @Override
    public BigInteger pageableAssessmentCount(String searchString, String companySid, String topicSid)
    {
        Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        Topic topic = topicRepository.findTopicBySid(BaseEntity.hexStringToByteArray(topicSid));
        if (company!=null && topic!=null){
            BigInteger assessmentCount =  assessmentRepository.pageableAssessmentCount("%"+searchString.trim()+"%", company, topic);
            return assessmentCount;
        }throw new InvalidSidException("invalid Company Sid Or Topic Sid");
    }

    @Override
    public VirtualAccountAssessmentTo quitAssessment(String quizSetSid, String virtualAccountSid) {
        Assessment assessment = assessmentRepository
                .findBySid(BaseEntity.hexStringToByteArray(quizSetSid));
        VirtualAccount virtualAccount = virtualAccountRepository
                .findVirtualAccountBySid(BaseEntity.hexStringToByteArray(virtualAccountSid));
        if (assessment!=null && virtualAccount!=null){
          virtualAccountAssessmentRepository.updateStatus(QuizStatus.QUIT,virtualAccount,assessment);
            VirtualAccountAssessment virtualAccountAssessment = virtualAccountAssessmentRepository
                    .findByAssessmentAndVirtualAccount(assessment, virtualAccount);
            VirtualAccountAssessmentTo virtualAccountAssessmentTo = mapper
                    .convert(virtualAccountAssessment, VirtualAccountAssessmentTo.class);
            virtualAccountAssessmentTo.setAssessmentSid(assessment.getStringSid());
            virtualAccountAssessmentTo.setVirtualAccountSid(virtualAccount.getStringSid());
            return virtualAccountAssessmentTo;
        }
        throw new InvalidSidException("invalid Assessment Sid Or Virtual Account Sid");
    }

    private Integer [] findCountsForDashBoard(VirtualAccount virtualAccount){
        Integer assessmentTaken = virtualAccountAssessmentRepository.findCountOfAssessmentTaken(virtualAccount);
        Integer onGoing = virtualAccountAssessmentRepository.findCountOfOnGoingAssessments(virtualAccount);
        Integer completed = virtualAccountAssessmentRepository.findCountOfCompletedAssessments(virtualAccount);
        Integer quit = virtualAccountAssessmentRepository.findCountOfQuitAssessments(virtualAccount);
        Integer yourScore = virtualAccountHasQuizSetAssessmentRepository.findAllAssessmentAverageScore(virtualAccount);
        Integer[] counts = new Integer[5];
        counts[0]=assessmentTaken;
        counts[1]=onGoing;
        counts[2]=completed;
        counts[3]=quit;
        counts[4]=yourScore;
        return counts;
    }
    @Override
    public DashBoardTO getUserDashboard(String virtualAccountSid){
        VirtualAccount virtualAccount = virtualAccountRepository
                .findVirtualAccountBySid(BaseEntity.hexStringToByteArray(virtualAccountSid));
        if (virtualAccount!=null){
            Integer[] counts = findCountsForDashBoard(virtualAccount);
            DashBoardTO dashBoardTO = new DashBoardTO();
            dashBoardTO.setAssessmentTaken(counts[0]);
            dashBoardTO.setOnGoing(counts[1]);
            dashBoardTO.setCompleted(counts[2]);
            dashBoardTO.setQuit(counts[3]);
            dashBoardTO.setYourScore(counts[4]);
            return dashBoardTO;
        }throw new InvalidSidException("Invalid virtual Account Sid");
    }

}