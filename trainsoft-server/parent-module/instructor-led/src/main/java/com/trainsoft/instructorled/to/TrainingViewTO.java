package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.util.Date;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrainingViewTO extends BaseTO{

    private static final long serialVersionUID = 8499150089941128019L;
    private String name;
    private int noOfBatches;
    private String course;
    private String instructor;
    private long startDate;
    private long endDate;
    private InstructorEnum.Status status;
    private String createdByVASid;
    private String updatedByVASid;
    private long createdOn;
    private long updatedOn;
    private String courseSid;
    private String virtualAccountSid;
   // private String batchParticipantsSid;
}
