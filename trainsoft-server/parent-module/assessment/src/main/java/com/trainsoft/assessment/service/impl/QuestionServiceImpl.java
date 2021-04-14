package com.trainsoft.assessment.service.impl;

import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.customexception.RecordNotFoundException;
import com.trainsoft.assessment.dozer.DozerUtils;
import com.trainsoft.assessment.entity.*;
import com.trainsoft.assessment.repository.*;
import com.trainsoft.assessment.service.IQuestionService;
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

    @Override
    public QuestionTo createQuestionAndAnswer(QuestionTo questionTo) {

        try {
            if (questionTo != null)
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

    private Company getCompany(String companySid){
        Company c=companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        Company company=new Company();
        company.setId(c.getId());
        return company;
    }

    @Override
    public List<QuestionTypeTo> getAllQuestionTypes() {
        try {
            List<QuestionType> questionTypeList = questionTypeRepository.findAll();
            if(CollectionUtils.isNotEmpty(questionTypeList)) {
                return mapper.convertList(questionTypeList, QuestionTypeTo.class,null);
            }
        }catch (Exception e) {
            log.error("throwing exception while fetching the all QuestionTypes",e.toString());
            throw new ApplicationException("Something went wrong while fetching the QuestionTypes");
        }
        return null;
    }
}
