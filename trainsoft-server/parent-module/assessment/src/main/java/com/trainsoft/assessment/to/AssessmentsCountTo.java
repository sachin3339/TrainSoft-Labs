package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AssessmentsCountTo
{

    private static final long serialVersionUID = 7092781229529473407L;
    private List<AssessmentCountTagTo> assessmentCountTagToList;
    private List<AssessmentCountDifficultyTo> assessmentCountDifficultyToList;
}
