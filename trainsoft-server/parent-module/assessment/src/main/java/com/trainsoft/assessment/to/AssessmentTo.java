package com.trainsoft.assessment.to;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.value.AssessmentEnum;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AssessmentTo extends BaseTO{

    private static final long serialVersionUID = -1672888962822818909L;

    @NonNull
    @ApiModelProperty(value = "It is required to create Assessment",required = true)
    private String title;
    private String description;
    private AssessmentEnum.Status status;
    private String CompanySid;
    private boolean isPremium;
    private AssessmentEnum.QuizSetDifficulty difficulty;
    private Long validUpto;
    private Integer duration;
    private boolean isMultipleSitting;
    private boolean isMandatory;
    private String createdByVirtualAccountSid;
    private String topicSid;
    private String tagSid;
    private Integer noOfQuestions;
    private String url;
    private boolean isNextEnabled;
    private boolean isAutoSubmitted;
    private boolean isPauseEnable;
    private boolean isNegative;
    private boolean isPreviousEnabled;
    private Date createdOn;
    private String updatedBySid;
    private Date updatedOn;
    private boolean isMultipleAttempts;
    private boolean isPaymentReceived;
    private boolean isReduceMarks;
    private boolean isQuestionRandomize;
    private String categorySid;
}
