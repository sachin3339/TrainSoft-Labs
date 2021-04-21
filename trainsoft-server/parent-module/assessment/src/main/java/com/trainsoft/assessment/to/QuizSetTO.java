package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.entity.AppUser;
import com.trainsoft.assessment.entity.Category;
import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.enums.Difficulty;
import com.trainsoft.assessment.enums.Status;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
@Setter @Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class QuizSetTO extends BaseTO{
    private static final long serialVersionUID = -8633936147312648829L;

    private String title;

    private String description;

    private Status status;

    private VirtualAccountTO createdBy;

    //private Instant createdOn;

    private  VirtualAccountTO updatedBy;

   //private  Instant updatedOn;

    private CompanyTO companyId;

    //private QuizTO quizId;

    private boolean isQuestionRandomize;

    private Integer duration;

    private boolean isPauseEnabled;

    private  boolean isPaymentReceived;

    private Double price;

    private boolean isNegative;

    private boolean reduceMarks;

    private boolean isPreviousEnabled;

    private  boolean isMultipleAttempts;

    private boolean isAutoSubmitted;

    private boolean isNextEnabled;

    private Difficulty difficulty;

    private  boolean isPremium;

    private boolean isMandatory;

    private  boolean isMultipleSitting;

   // private Instant validUpTo;

    private CategoryTO category;
}
