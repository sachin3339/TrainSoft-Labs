package com.trainsoft.assessment.to;

import com.trainsoft.assessment.value.AssessmentEnum;

import java.util.List;

public class FilterAssessmentsTo extends BaseTO
{

    private static final long serialVersionUID = -9183731339608363151L;

    private List<TagTo> tags;
    private AssessmentEnum.QuizSetDifficulty difficulty;
    private String categorySid;
    private String companySid;
}
