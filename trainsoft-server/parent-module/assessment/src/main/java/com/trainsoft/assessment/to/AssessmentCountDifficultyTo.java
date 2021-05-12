package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AssessmentCountDifficultyTo
{
    private static final long serialVersionUID = -4424692313544522934L;
    private String difficultyName;
    private Integer count;
}