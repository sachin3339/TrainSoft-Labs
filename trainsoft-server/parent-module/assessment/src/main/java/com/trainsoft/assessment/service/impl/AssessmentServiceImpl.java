package com.trainsoft.assessment.service.impl;

import com.trainsoft.assessment.commons.CommonUtils;
import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.customexception.DuplicateRecordException;
import com.trainsoft.assessment.customexception.FunctionNotAllowedException;
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
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
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
                assessment.setTagId(tagRepository.findBySid(BaseEntity.hexStringToByteArray(assessmentTo.getTagSid())));
                return mapper.convert(assessmentRepository.save(assessment),AssessmentTo.class);
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
            List<Assessment> assessmentList = assessmentRepository.findAssessmentByTopicId(topic,pageable);
            if (CollectionUtils.isNotEmpty(assessmentList))
            {
                if (CollectionUtils.isNotEmpty(assessmentList)) {
                    List<AssessmentTo> assessmentToList = mapper.convertList(assessmentList, AssessmentTo.class);
                    assessmentToList.forEach(assessmentTo ->
                    {
                        assessmentTo.setTopicSid(BaseEntity.bytesToHexStringBySid(topic.getSid()));
                        assessmentTo.setNoOfQuestions(getNoOfQuestionByAssessmentSid(assessmentTo.getSid()));
                    });
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
    public List<AssessmentTo> getInstructionsForAssessment(InstructionsRequestTO request) {
        Tag tag = tagRepository.findBySid(BaseEntity.hexStringToByteArray(request.getTagSid()));
        if (tag==null) throw new InvalidSidException("invalid Tag Sid");
        List<Assessment> assessment= assessmentRepository.findByTagAndDifficulty(tag.getId(),request.getDifficulty());
       List<AssessmentTo> assessmentToList = new ArrayList<>();
        assessment.forEach(as->{
            Integer noOfQuestion = getNoOfQuestionByAssessmentSid(as.getStringSid());
            AssessmentTo assessmentTo = new AssessmentTo();
            assessmentTo.setSid(as.getStringSid());
            assessmentTo.setCompanySid(as.getCompany().getStringSid());
            assessmentTo.setCategory(as.getCategory());
            assessmentTo.setTagSid(as.getTagId().getStringSid());
            assessmentTo.setTopicSid(as.getTopicId().getStringSid());
            assessmentTo.setNoOfQuestions(noOfQuestion);
            assessmentTo.setAutoSubmitted(as.isAutoSubmitted());
            assessmentTo.setDescription(as.getDescription());
            assessmentTo.setDifficulty(as.getDifficulty());
            assessmentTo.setDuration(as.getDuration());
            assessmentTo.setMandatory(as.isMandatory());
            assessmentTo.setMultipleSitting(as.isMultipleSitting());
            assessmentTo.setPauseEnable(as.isPauseEnable());
            assessmentTo.setPreviousEnabled(as.isPreviousEnabled());
            assessmentTo.setPremium(as.isPremium());
            assessmentTo.setStatus(as.getStatus());
            assessmentTo.setValidUpto(as.getValidUpto());
            assessmentTo.setNegative(as.isNegative());
            assessmentTo.setNextEnabled(as.isNextEnabled());
            assessmentTo.setTitle(as.getTitle());
            assessmentTo.setUrl(as.getUrl());
            assessmentTo.setCreatedByVirtualAccountSid(as.getCreatedBy().getStringSid());
            assessmentToList.add(assessmentTo);
        });
        return assessmentToList;
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
        virtualAccountHasQuestionAnswerDetails.setAnswer(CommonUtils.toJsonFunction.apply(request.getAnswer()));
        Assessment assessment = assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(request.getQuizSetSid()));
        if (assessment==null)throw new InvalidSidException("invalid Quiz set Sid");
            virtualAccountHasQuestionAnswerDetails.setCompanyId(assessment.getCompany());
            virtualAccountHasQuestionAnswerDetails.setCreatedBy(assessment.getCreatedBy());
            virtualAccountHasQuestionAnswerDetails.setCreatedOn(assessment.getCreatedOn());
        Answer answer = answerRepository.findCorrectAnswer(question.getId());
        if (answer!=null && answer.getAnswerOption().equals(request.getAnswer()))
            virtualAccountHasQuestionAnswerDetails.setCorrect(true);
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
        return vto;
    }



    @Override
    public String removeAssociatedQuestionFromAssessment(String questionSid)
    {
        if(questionSid!=null)
        {
            Question question=questionRepository.findQuestionBySid(BaseEntity.hexStringToByteArray(questionSid));
            Optional<AssessmentQuestion> assessmentQuestion = assessmentQuestionRepository.findAssessmentQuestionByQuestionId(question);
            if(assessmentQuestion.isPresent())
            {
                assessmentQuestionRepository.delete(assessmentQuestion.get());
                return "Removed associated question successfully";
            }
            else
              throw new RuntimeException("Record not found to delete");
        }
        else throw new InvalidSidException("Invalid Question Sid");
    }

    @Override
    public String generateAssessmentURL(String assessmentSid, HttpServletRequest request)
    {
        if(assessmentSid!=null)
        {
            String URL = request.getRequestURL().toString();
            String URI = request.getRequestURI();
            int port = request.getServerPort();
            String Host = URL.replace(":"+port+URI, "");
            String generatedUrl=Host.concat("/assessment?assessmentSid="+assessmentSid);
            Assessment assessment=assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentSid));
            assessment.setUrl(generatedUrl);
            assessmentRepository.save(assessment);
            return "generated Assessment URL successfully and Saved";
        }
        else throw new InvalidSidException("Assessment Sid is not valid");
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
                vTo.setQuestion(mapper.convert(question,QuestionTo.class));
                vTo.getQuestion().setSid(question.get().getStringSid());
                vTo.getQuestion().setName(question.get().getName());
                vTo.getQuestion().setDescription(question.get().getDescription());
                vTo.getQuestion().setCreatedByVirtualAccountSid(question.get().getCreatedBy().getStringSid());
                vTo.getQuestion().setTechnologyName(question.get().getTechnologyName());
                vTo.getQuestion().setQuestionPoint(question.get().getQuestionPoint());
                vTo.getQuestion().setStatus(question.get().getStatus());
                vTo.getQuestion().setQuestionType(question.get().getQuestionType());
                vTo.getQuestion().setDifficulty(question.get().getDifficulty());
                vTo.getQuestion().setAnswerExplanation(question.get().getAnswerExplanation());
                vTo.getQuestion().setCompanySid(question.get().getCompany().getStringSid());
                List<Answer> answer = answerRepository.findAnswerByQuestionId(question.get().id);
                vTo.getQuestion().setAnswer(mapper.convertList(answer,AnswerTo.class));
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

}