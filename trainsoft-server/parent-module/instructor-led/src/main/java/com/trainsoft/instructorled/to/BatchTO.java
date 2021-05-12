package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class BatchTO extends BaseTO{
    private static final long serialVersionUID = 1611538279811813167L;
    private String name;
    private InstructorEnum.Status status;
    private InstructorEnum.TrainingType trainingType;
    private long createdOn;
    private String createdByVASid;
    private long updatedOn;
    private String updatedByVASid;
    private String companySid;
}
