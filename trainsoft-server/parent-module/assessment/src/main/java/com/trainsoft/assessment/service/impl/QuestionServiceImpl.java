package com.trainsoft.assessment.service.impl;

import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.customexception.FunctionNotAllowedException;
import com.trainsoft.assessment.customexception.InvalidSidException;
import com.trainsoft.assessment.customexception.RecordNotFoundException;
import com.trainsoft.assessment.dozer.DozerUtils;
import com.trainsoft.assessment.entity.*;
import com.trainsoft.assessment.repository.*;
import com.trainsoft.assessment.service.IQuestionService;
import com.trainsoft.assessment.to.*;
import com.trainsoft.assessment.to.AnswerTo;
import com.trainsoft.assessment.to.QuestionTo;
import com.trainsoft.assessment.to.QuestionTypeTo;
import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Slf4j
@AllArgsConstructor
@Service
public class QuestionServiceImpl implements IQuestionService {

    private final IVirtualAccountRepository virtualAccountRepository;
    private final DozerUtils mapper;
    private final ICompanyRepository companyRepository;
    private final IQuestionRepository questionRepository;
    private final IQuestionTypeRepository questionTypeRepository;
    private  final IAnswerRepository answerRepository;
    private final IAssessmentQuestionRepository assessmentQuestionRepository;

    @Override
    public QuestionTo createQuestionAndAnswer(QuestionTo questionTo) {

        try {
            if (questionTo != null && CollectionUtils.isNotEmpty(questionTo.getAnswer()))
            {
                // get Virtual Account
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                        (BaseEntity.hexStringToByteArray(questionTo.getCreatedByVirtualAccountSid()));
                // question details to save
                Question question = mapper.convert(questionTo, Question.class);
                question.generateUuid();
                question.setCreatedBy(virtualAccount);
                question.setCompany(virtualAccount.getCompany());
                question.setStatus(AssessmentEnum.Status.ENABLED);
                question.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                // answer details to save
                List<AnswerTo> answerToList = questionTo.getAnswer();
                List<Answer> answerList = mapper.convertList(answerToList, Answer.class,null);
                if(CollectionUtils.isNotEmpty(answerList))
                {
                    answerList.forEach(answer ->
                            {
                                answer.generateUuid();
                                answer.setCreatedBy(virtualAccount);
                                answer.setStatus(AssessmentEnum.Status.ENABLED);
                                answer.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                                answer.setQuestionId(question);
                            });
                    question.setAnswers(answerList);
                    QuestionTo savedQuestionTO = mapper.convert(questionRepository.save(question), QuestionTo.class);
                    savedQuestionTO.setCreatedByVirtualAccountSid(virtualAccount.getStringSid());
                    savedQuestionTO.setAnswer(mapper.convertList(answerList,AnswerTo.class));
                    return savedQuestionTO;
                }
                  log.error("Question and answer is not saved");
                  return null;
            } else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while creating the Question", e.toString());
            throw new ApplicationException("Something went wrong while creating the Question" + e.getMessage());
        }
    }

    @Override
    public List<QuestionTo> getAllQuestions()
    {
        try
        {
            List<Question> questionsList = questionRepository.findAll();
            if (CollectionUtils.isNotEmpty(questionsList)) {
                return mapper.convertList(questionsList, QuestionTo.class);
            }
            else
                throw new RecordNotFoundException("No record found");
        } catch (Exception exp)
        {
            log.error("throwing exception while getting all Questions", exp.toString());
            throw new ApplicationException("Something went wrong while getting all Question" + exp.getMessage());
        }
    }

    @Override
    public List<QuestionTo> displayQuestionsForAssessment()
    {
        List<Question> questionList=questionRepository.findQuestionBySidNotInAssessments();
        if(CollectionUtils.isNotEmpty(questionList))
        {
           return mapper.convertList(questionList,QuestionTo.class);
        }
        log.warn("No Questions available");
        return Collections.EMPTY_LIST;
    }


    @Override
    public QuestionTo getAnswersQuestionBySid(String questionSid)
    {
        try
        {
            if (questionSid != null)
            {
               Question question=questionRepository.findQuestionBySid(BaseEntity.hexStringToByteArray(questionSid));
               QuestionTo questionTo=mapper.convert(question,QuestionTo.class);
               questionTo.setAnswer(mapper.convertList(question.getAnswers(),AnswerTo.class));
               return questionTo;
            }
            else
                throw new RecordNotFoundException("No record found");
        }catch (Exception exp)
        {
            log.error("throwing exception while getting Question and Answer details", exp.toString());
            throw new ApplicationException("No record found while fetching Question and Answer details" + exp.getMessage());
        }
    }

    @Override
    public List<QuestionTypeTo> getAllQuestionTypes() {
        try {
            List<QuestionType> questionTypeList = questionTypeRepository.findAll();
            if(CollectionUtils.isNotEmpty(questionTypeList)) {
                return mapper.convertList(questionTypeList, QuestionTypeTo.class);
            }
            else
                throw new RecordNotFoundException("No record found");
        }catch (Exception e) {
            log.error("throwing exception while fetching the all QuestionTypes",e.toString());
            throw new ApplicationException("Something went wrong while fetching the QuestionTypes");
        }
    }

    @Override
    public QuestionTo updateQuestion(QuestionTo request) {
        Question question = questionRepository.findQuestionBySid(BaseEntity.hexStringToByteArray(request.getSid()));
        if (question==null) throw new InvalidSidException("invalid question sid.");
        List<Answer> answer = answerRepository.findAnswerByQuestionId(question.getId());
        question.setName(request.getName());
        question.setDifficulty(request.getDifficulty());
        question.setQuestionType(request.getQuestionType());
        question.setTechnologyName(request.getTechnologyName());
        question.setQuestionPoint(request.getQuestionPoint());
        List<AnswerTo> answerTO = new ArrayList<>();
        for (Answer ar : answer) {
            for (AnswerTo re : request.getAnswer()) {
                if (ar.getStringSid().equals(re.getSid())) {
                    ar.setAnswerOptionValue(re.getAnswerOptionValue());
                    ar.setAnswerOption(re.getAnswerOption());
                    ar.setCorrect(re.isCorrect());
                    answerTO.add(re);
                }
            }
        }
         question.setAnswers(answerRepository.saveAll(answer));
         question.setAnswerExplanation(request.getAnswerExplanation());
         question.setDescription(request.getDescription());
         QuestionTo questionTo= mapper.convert(questionRepository.save(question),QuestionTo.class);
         questionTo.setAnswer(answerTO);
         questionTo.setCreatedByVirtualAccountSid(question.getCreatedBy().getStringSid());
         questionTo.setCompanySid(question.getCompany().getStringSid());
         return questionTo;
    }

    @Override
    public void deleteQuestion(String questionSid) {
        Question question= questionRepository.findQuestionBySid(BaseEntity.hexStringToByteArray(questionSid));
        if (question==null) throw new InvalidSidException("invalid question sid.");
        List<AssessmentQuestion> assessmentQuestion = assessmentQuestionRepository.findAssessmentQuestionByQuestion(question);
        if (!assessmentQuestion.isEmpty()) throw new FunctionNotAllowedException("can not delete a quiz set associated question");
        question.setStatus(AssessmentEnum.Status.DELETED);
        questionRepository.save(question);
        List<Answer> answer = answerRepository.findAnswerByQuestionId(question.getId());
        answer.forEach(as->{
            as.setStatus(AssessmentEnum.Status.DELETED);
        });
        answerRepository.saveAll(answer);
       return;
    }
}
