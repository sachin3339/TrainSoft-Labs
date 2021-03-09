package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Batch;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrainingTO extends BaseTO{

    private String name;
    private long startDate;
    private long endDate;
    private InstructorEnum.Status status;
    private String instructorName;
    private long createdOn;
    private String createdByVASid;
    private long updatedOn;
    private String updatedByVASid;
    private String courseSid;
}
