package com.trainsoft.assessment.to;

import com.trainsoft.assessment.enums.Difficulty;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
@Setter @Getter
public class MyAssessmentsTO implements Serializable {
    private static final long serialVersionUID = -4388203056420422879L;
    private String title;
    private String description;
    private String difficulty;
    private Integer noOfQuestions;
    private Integer duration;
    private String status;
    private Double score;
    private String quizSetSid;
    private String tagSid;
    private String url;
    private String virtualAccountSid;
    private Integer assessmentCount;
}
