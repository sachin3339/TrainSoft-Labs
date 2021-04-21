package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.entity.Question;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AssessmentQuestionTo extends BaseTO
{
    private String status;
    private int questionNumber;
    private boolean isAnswerRandomize;
    private int questionPoint;
    private String CompanySid;
    private String virtualAccountSid;
    private List<String> questionSidList;
    private String topicSid;
    private Question questionId;
}
