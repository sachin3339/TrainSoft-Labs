package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Question;
import com.trainsoft.assessment.entity.VirtualAccount;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
@Setter @Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class VirtualAccountHasQuestionAnswerDetailsTO extends BaseTO{
    private static final long serialVersionUID = 4021464334670194432L;

    private VirtualAccount virtualAccountId;

    private Question questionId;

    private String answer;

    private boolean isCorrect;

    private Company companyId;

    private VirtualAccount createdBy;

    private Date createdOn;
}
