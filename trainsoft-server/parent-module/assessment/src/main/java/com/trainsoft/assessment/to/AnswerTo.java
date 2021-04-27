package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.entity.Question;
import com.trainsoft.assessment.entity.VirtualAccount;
import com.trainsoft.assessment.value.AssessmentEnum;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;


@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AnswerTo extends BaseTO{

    @NonNull
    @ApiModelProperty(value = "It is required to create Answer , this represents answer option ex : A or B or C or D",required = true)
    private String answerOption;
    @NonNull
    @ApiModelProperty(value = "It is required to create Answer, this value represents actual answer",required = true)
    private String answerOptionValue;
    private AssessmentEnum.Status status;
    @NonNull
    @ApiModelProperty(value = "It is required to create Answer, this value represents Correct answer out of all answers",required = true)
    private boolean isCorrect;
}
