package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Setter @Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class VirtualAccountHasQuizSetAssessmentTO extends BaseTO{
    private static final long serialVersionUID = -1901331898103996011L;

    private String quizSid;
    private String quizSetSid;
    private Integer totalMarks;
    private Integer gainMarks;
    private Integer totalNumberOfQuestions;
    private Integer totalNumberOfCorrectAnswer;
    private Integer totalNumberOfWrongAnswer;
    private Integer numberOfAttemptedQuestion;
    private Double percentage;
    private Date submittedOn;
    private String companySid;
    private String createdBySid;
    private Date createdOn;
    private String updatedBySid;
    private Date updatedOn;
    private String virtualAccountSid;
}
