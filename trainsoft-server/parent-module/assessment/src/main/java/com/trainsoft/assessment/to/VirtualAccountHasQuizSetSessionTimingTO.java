package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Date;
@Setter @Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class VirtualAccountHasQuizSetSessionTimingTO extends BaseTO{
    private static final long serialVersionUID = 5271700122967125717L;
    private String virtualAccountSid;
    private String quizSetSid;
    private String quizSid;
    private Date startTime;
    private Date endTime;
    private String companySid;
    private InstructorEnum.Status status;
}
