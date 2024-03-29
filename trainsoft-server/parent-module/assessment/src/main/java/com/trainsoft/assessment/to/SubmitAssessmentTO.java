package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;

@Setter @Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class SubmitAssessmentTO implements Serializable {
    private static final long serialVersionUID = -574003405524374881L;
    private String quizSetSid;
    private String virtualAccountSid;
}
