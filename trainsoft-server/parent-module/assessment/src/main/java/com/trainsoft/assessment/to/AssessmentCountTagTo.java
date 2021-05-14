package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AssessmentCountTagTo extends BaseTO
{

    private static final long serialVersionUID = 6084485139490470650L;

    private String tagName;
    private Integer count;
}
