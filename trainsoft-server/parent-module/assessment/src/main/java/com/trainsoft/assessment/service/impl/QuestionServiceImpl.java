package com.trainsoft.assessment.service.impl;

import com.google.common.io.Files;
import com.trainsoft.assessment.commons.JWTTokenTO;
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
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStreamReader;
import java.time.Instant;
import java.util.*;

@Slf4j
@Service
public class QuestionServiceImpl implements IQuestionService {

    private final IVirtualAccountRepository virtualAccountRepository;
    private final DozerUtils mapper;
    private final ICompanyRepository companyRepository;
    private final IQuestionRepository questionRepository;
    private final IQuestionTypeRepository questionTypeRepository;
    @Value("${answer.option.value.csv.header}")
    private  String ANSWER_OPTION_VALUE_CSV_HEADER;
    @Value("${answer.option.is.correct.csv.header}")
    private String ANSWER_OPTION_IS_CORRECT_CSV_HEADER;

    @Autowired
    public QuestionServiceImpl(IVirtualAccountRepository virtualAccountRepository, DozerUtils mapper, ICompanyRepository companyRepository, IQuestionRepository questionRepository, IQuestionTypeRepository questionTypeRepository) {
        this.virtualAccountRepository = virtualAccountRepository;
        this.mapper = mapper;
        this.companyRepository = companyRepository;
        this.questionRepository = questionRepository;
        this.questionTypeRepository = questionTypeRepository;
    }

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
    public List<CSVRecord> processQuestionAnswerInBulk(MultipartFile multipartFile, JWTTokenTO jwtTokenTO)
    {
        if(multipartFile!=null && !multipartFile.isEmpty())
        {
            String extension = Files.getFileExtension(multipartFile.getOriginalFilename());

            if(extension.equalsIgnoreCase("csv"))
            {
                return readCSV(multipartFile,jwtTokenTO);
            }
        }
        return null;
    }

    private List<CSVRecord> readCSV(MultipartFile multipartFile,JWTTokenTO jwtTokenTO)
    {
        try
        {
            InputStreamReader inputStreamReader = new InputStreamReader(multipartFile.getInputStream());
            CSVParser parser = CSVFormat.DEFAULT.withDelimiter(',').withHeader().parse(inputStreamReader);
            List<CSVRecord> errorList = new ArrayList<>();
            List<QuestionTo> questionToList = new ArrayList<>();
            for(CSVRecord record : parser)
            {
                QuestionTo questionTo = new QuestionTo();
                if ( validateCsvFields(record))
                {
                   errorList.add(record);
                }
                else {
                    questionTo.setName(record.get("name").trim());
                    questionTo.setDescription(record.get("description").trim());
                    questionTo.setTechnologyName(record.get("tag_name").trim());
                    questionTo.setQuestionPoint(Integer.parseInt(record.get("question_point").trim()));
                    setQuestionDifficulty(record.get("question_difficulty").trim(), questionTo);
                    questionTo.setNegativeQuestionPoint(Integer.parseInt(record.get("negative_question_point").trim()));
                    questionTo.setAnswerExplanation(record.get("answer_explanation").trim());
                    List<AnswerTo> answerToList=getAnswers(record);
                    if(CollectionUtils.isNotEmpty(answerToList))
                    questionTo.setAnswer(answerToList);
                    questionToList.add(questionTo);
                }
            }
            if(CollectionUtils.isNotEmpty(questionToList)) {
                saveQuestionBulkData(questionToList, jwtTokenTO);
            }
            return errorList;
        } catch (Exception exp)
        {
            log.error("throwing exception while processing Question and Answer in Bulk", exp.toString());
            throw new ApplicationException("Something went wrong while creating the Question and Answer in Bulk" + exp.getMessage());
        }
    }

    private void saveQuestionBulkData(List<QuestionTo> questionToList,JWTTokenTO jwtTokenTO)
    {
        try {
            VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                    (BaseEntity.hexStringToByteArray(jwtTokenTO.getVirtualAccountSid()));
            List<Question> questionList = new ArrayList<>();
            for (QuestionTo questionTo : questionToList) {
                Question question = mapper.convert(questionTo, Question.class);
                question.generateUuid();
                question.setCreatedBy(virtualAccount);
                question.setCompany(virtualAccount.getCompany());
                question.setStatus(AssessmentEnum.Status.ENABLED);
                question.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                // answer details to save
                List<AnswerTo> answerToList = questionTo.getAnswer();
                List<Answer> answerList = mapper.convertList(answerToList, Answer.class, null);
                if (CollectionUtils.isNotEmpty(answerList)) {
                    answerList.forEach(answer ->
                    {
                        answer.generateUuid();
                        answer.setCreatedBy(virtualAccount);
                        answer.setStatus(AssessmentEnum.Status.ENABLED);
                        answer.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                        answer.setQuestionId(question);
                    });
                    question.setAnswers(answerList);
                    questionList.add(question);
                }
            }
            questionRepository.saveAll(questionList);
        }catch (Exception exp)
        {
            log.error("throwing exception while processing Question and Answer in Bulk", exp.toString());
            throw new ApplicationException("Something went wrong while creating the Question and Answer in Bulk" + exp.getMessage());
        }
    }

    private boolean validateCsvFields(CSVRecord record)
    {
       return record.get("name").isEmpty() || record.get("description").isEmpty() || record.get("question_point").isEmpty()
                || record.get("tag_name").isEmpty() || record.get("answer_explanation").isEmpty()
                || record.get("answer_is_correct_A").isEmpty() || record.get("answer_is_correct_B").isEmpty()
                || record.get("answer_is_correct_C").isEmpty() || record.get("answer_is_correct_D").isEmpty()
                || record.get("answer_option_value_A").isEmpty() || record.get("answer_option_value_B").isEmpty()
                || record.get("answer_option_value_C").isEmpty() || record.get("answer_option_value_D").isEmpty();
    }

    private List<AnswerTo> getAnswers(CSVRecord record)
    {
        List<AnswerTo> answerToList = new ArrayList<>();
        if(!ANSWER_OPTION_VALUE_CSV_HEADER.isEmpty() && !ANSWER_OPTION_IS_CORRECT_CSV_HEADER.isEmpty() )
        {
            String[] answerOptionValues = ANSWER_OPTION_VALUE_CSV_HEADER.split(",");
            char ch='A';
            for (String value : answerOptionValues)
            {
                AnswerTo answerTo = new AnswerTo();
                answerTo.setAnswerOptionValue(record.get(value).trim());
                answerTo.setAnswerOption(""+ ch++);
                answerToList.add(answerTo);
            }
            String[] answerOptionCorrect = ANSWER_OPTION_IS_CORRECT_CSV_HEADER.split(",");
            int i = 0;
            for(AnswerTo answerTo : answerToList)
            {
                answerTo.setCorrect(record.get(answerOptionCorrect[i++]).equals("1")?Boolean.TRUE:Boolean.FALSE);
            }
        }
        return answerToList;
    }

    private void setQuestionDifficulty(String questionDifficulty,QuestionTo questionTo)
    {
        if(questionDifficulty.equalsIgnoreCase(AssessmentEnum.QuestionDifficulty.BEGINNER.toString()))
            questionTo.setDifficulty(AssessmentEnum.QuestionDifficulty.BEGINNER);
        else if(questionDifficulty.equalsIgnoreCase(AssessmentEnum.QuestionDifficulty.INTERMEDIATE.toString()))
            questionTo.setDifficulty(AssessmentEnum.QuestionDifficulty.INTERMEDIATE);
        else if(questionDifficulty.equalsIgnoreCase(AssessmentEnum.QuestionDifficulty.EXPERT.toString()))
            questionTo.setDifficulty(AssessmentEnum.QuestionDifficulty.EXPERT);
    }
}
