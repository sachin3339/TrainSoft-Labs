package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AssessmentsFilterTo extends BaseTO
{

    private static final long serialVersionUID = -9183731339608363151L;

    private List<String> tagsList;
    private List<AssessmentEnum.QuizSetDifficulty> difficultyList;
    @NonNull
    private String categorySid;
    @NonNull
    private String companySid;
}
