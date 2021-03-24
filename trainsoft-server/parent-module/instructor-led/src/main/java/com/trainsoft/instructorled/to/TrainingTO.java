package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Batch;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.User;

import java.util.List;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrainingTO extends BaseTO{

    private String name;
    private long startDate;
    private long endDate;
    private InstructorEnum.Status status;
    private UserTO instructor;
    private long createdOn;
    private String createdByVASid;
    private long updatedOn;
    private String updatedByVASid;
    private String courseSid;
    private List<TrainingBatchTO> trainingBatchs;
    private String companySid;
}
