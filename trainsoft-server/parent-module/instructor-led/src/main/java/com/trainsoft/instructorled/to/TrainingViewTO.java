package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrainingViewTO extends BaseTO{

    private String name;
    private int noOfBatches;
    private String course;
    private String instructor;
    private Date startDate;
    private Date endDate;
    private InstructorEnum.Status status;
    private String createdByVASid;
    private String updatedByVASid;
}
