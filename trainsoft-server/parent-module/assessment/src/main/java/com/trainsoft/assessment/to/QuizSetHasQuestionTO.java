package com.trainsoft.assessment.to;

import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Question;
import com.trainsoft.assessment.entity.QuizSet;
import com.trainsoft.assessment.entity.VirtualAccount;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
@Setter @Getter
public class QuizSetHasQuestionTO extends BaseTO{
    private static final long serialVersionUID = -8366508520013180718L;

    private Question questionId;

    private VirtualAccount createdBy;

    private Instant createdOn;

    private VirtualAccount updatedBy;

    private Instant updatedOn;

    private String status;

    private Company companyId;

    private Integer questionNumber;

    private boolean isAnswerRandomize;

    private Integer questionPoint;

    private QuizSet quizSetId;
}
