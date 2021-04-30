package com.trainsoft.assessment.service.impl;

import com.google.common.io.Files;
import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.customexception.FunctionNotAllowedException;
import com.trainsoft.assessment.customexception.InvalidSidException;
import com.trainsoft.assessment.customexception.DuplicateRecordException;
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
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
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
    private final IAnswerRepository answerRepository;
    private final IAssessmentQuestionRepository assessmentQuestionRepository;
    @Value("${answer.option.value.csv.header}")
    private  String ANSWER_OPTION_VALUE_CSV_HEADER;
    @Value("${answer.option.is.correct.csv.header}")
    private String ANSWER_OPTION_IS_CORRECT_CSV_HEADER;


    @Autowired
    public QuestionServiceImpl(IVirtualAccountRepository virtualAccountRepository, DozerUtils mapper, ICompanyRepository
            companyRepository, IQuestionRepository questionRepository, IQuestionTypeRepository questionTypeRepository,
                               IAnswerRepository answerRepository,IAssessmentQuestionRepository assessmentQuestionRepository) {
        this.virtualAccountRepository = virtualAccountRepository;
        this.mapper = mapper;
        this.companyRepository = companyRepository;
        this.questionRepository = questionRepository;
        this.questionTypeRepository = questionTypeRepository;
        this.answerRepository=answerRepository;
        this.assessmentQuestionRepository=assessmentQuestionRepository;
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
                if(isDuplicateRecord(question))
                {
                    log.error("Duplicate question, Saving failed :" + question.getName());
                    throw new DuplicateRecordException("This question is already exist : "+question.getName());
                }
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
        }
        catch (Exception e)
        {
            if(e instanceof DuplicateRecordException)
            {
                throw new ApplicationException(((DuplicateRecordException) e).devMessage);
            }
            log.error("throwing exception while creating the Question", e.toString());
            throw new ApplicationException("Something went wrong while creating the Question :" + e.getMessage());
        }
    }

    @Override
    public List<QuestionTo> getAllQuestions(String companySid, Pageable pageable)
    {
        try
        {
            Company company=getCompany(companySid);
            List<Question> questionsList = questionRepository.findQuestionsByCompany(company,pageable);
            if (CollectionUtils.isNotEmpty(questionsList)) {
                return mapper.convertList(questionsList, QuestionTo.class);
            }
            else
                throw new RecordNotFoundException("No records found");
        } catch (Exception exp)
        {
            log.error("throwing exception while getting all Questions", exp.toString());
            throw new ApplicationException("Something went wrong while getting all Question" + exp.getMessage());
        }
    }

    @Override
    public List<QuestionTo> displayQuestionsForAssessment(String companySid)
    {
        List<Question> questionList=questionRepository.findQuestionBySidNotInAssessments(getCompany(companySid));
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

    @Override
    public List<CSVRecord> processQuestionAnswerInBulk(MultipartFile multipartFile, String virtualAccountSid)
    {
        if(multipartFile!=null && !multipartFile.isEmpty())
        {
            String extension = Files.getFileExtension(multipartFile.getOriginalFilename());

            if(extension.equalsIgnoreCase("csv"))
            {
                return readCSV(multipartFile,virtualAccountSid);
            }
        }
        log.error("Check Csv File, something is missing");
        return null;
    }

    private List<CSVRecord> readCSV(MultipartFile multipartFile,String virtualAccountSid)
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
                if (validateCsvFields(record) || !validateCsvFieldValues(record))
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
                    questionTo.setQuestionType(AssessmentEnum.QuestionType.MCQ);
                    List<AnswerTo> answerToList=getAnswers(record);
                    if(CollectionUtils.isNotEmpty(answerToList))
                    questionTo.setAnswer(answerToList);
                    questionToList.add(questionTo);
                }
            }
            if(CollectionUtils.isNotEmpty(questionToList)) {
                saveQuestionBulkData(questionToList, virtualAccountSid);
            }
            return errorList;
        } catch (Exception exp)
        {
            log.error("throwing exception while processing Question and Answer in Bulk", exp.toString());
            throw new ApplicationException("Something went wrong while creating the Question and Answer in Bulk" + exp.getMessage());
        }
    }

    private void saveQuestionBulkData(List<QuestionTo> questionToList,String virtualAccountSid)
    {
        try {
            VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                    (BaseEntity.hexStringToByteArray(virtualAccountSid));
            List<Question> questionList = new ArrayList<>();
            for (QuestionTo questionTo : questionToList) {
                Question question = mapper.convert(questionTo, Question.class);
                if(isDuplicateRecord(question))
                {
                    log.error("Duplicate question, Not saving this question :"+question.getName());
                    continue;
                }
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
            if(CollectionUtils.isNotEmpty(questionList))
            {
                questionRepository.saveAll(questionList);
                log.info("Records saved successfully !");
            }
        }catch (Exception exp)
        {
            log.error("throwing exception while processing Question and Answer in Bulk", exp.toString());
            throw new ApplicationException("Something went wrong while creating the Question and Answer in Bulk : "+exp.getMessage());
        }
    }

    private boolean validateCsvFields(CSVRecord record)
    {
       return record.get("name").isEmpty() || record.get("description").isEmpty() || record.get("question_point").isEmpty()
                || record.get("tag_name").isEmpty() || record.get("answer_explanation").isEmpty() || record.get("negative_question_point").isEmpty()
                || record.get("answer_is_correct_A").isEmpty() || record.get("answer_is_correct_B").isEmpty()
                || record.get("answer_is_correct_C").isEmpty() || record.get("answer_is_correct_D").isEmpty()
                || record.get("answer_option_value_A").isEmpty() || record.get("answer_option_value_B").isEmpty()
                || record.get("answer_option_value_C").isEmpty() || record.get("answer_option_value_D").isEmpty();
    }

    private boolean validateCsvFieldValues(CSVRecord record)
    {
        return StringUtils.isNumeric(record.get("question_point").trim())
                || StringUtils.isNumeric(record.get("negative_question_point").trim());
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
                answerTo.setCorrect(record.get(answerOptionCorrect[i++]).equalsIgnoreCase("True")?Boolean.TRUE:Boolean.FALSE);
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

    // To avoid duplicates
    private boolean isDuplicateRecord(Question question)
    {
            String name = question.getName();
            Question existingQuestion = questionRepository.findQuestionsByName(name);
            if (existingQuestion != null && name.equalsIgnoreCase(existingQuestion.getName()))
            {
                question.setSid(existingQuestion.getSid());
                return Boolean.TRUE;
            }
            return Boolean.FALSE;
    }

    private Company getCompany(String companySid){
        Company c=companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        Company company=new Company();
        company.setId(c.getId());
        return company;
    }
}
