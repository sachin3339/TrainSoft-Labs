package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
@Setter @Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class VirtualAccountHasQuestionAnswerDetailsTO extends BaseTO{
    private static final long serialVersionUID = 4021464334670194432L;
    private String virtualAccountSid;
    private String questionSid;
    private String answer;
    private boolean isCorrect;
    private String companySid;
    private String createdBySid;
    private Date createdOn;
    private Integer questionPoint;
    private QuestionTo question;
}
