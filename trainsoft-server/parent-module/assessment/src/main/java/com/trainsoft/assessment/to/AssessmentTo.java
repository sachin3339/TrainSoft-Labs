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

    @NonNull
    @ApiModelProperty(value = "It is required to create Assessment",required = true)
    private String title;
    private String description;
    private AssessmentEnum.Status status;
    private String CompanySid;
    private boolean isPremium;
    private String category;
    private AssessmentEnum.QuizSetDifficulty difficulty;
    private Date validUpto;
    private int duration;
    private boolean isMultipleSitting;
    private boolean isMandatory;
    private String createdByVirtualAccountSid;
    private String topicSid;
    private String tagSid;
}
