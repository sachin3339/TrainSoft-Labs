package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class BatchTO extends BaseTO{
    private String name;
    private InstructorEnum.Status status;
    private InstructorEnum.TrainingType trainingType;
    private long startDate;
    private long endDate;
    private long createdOn;
    private String createdByVASid;
}
