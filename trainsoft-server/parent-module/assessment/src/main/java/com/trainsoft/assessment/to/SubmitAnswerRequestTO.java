package com.trainsoft.assessment.to;

import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
@Setter @Getter
public class SubmitAnswerRequestTO implements Serializable {
    private static final long serialVersionUID = 1177972439476645805L;
    private String sid;
    private String virtualAccountSid;
    private String questionSid;
    private String answerSid;
    private String quizSetSid;
}
