package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Course;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrainingBatchTO extends BaseTO{

    private static final long serialVersionUID = 8739961294066274775L;
    private String batchSid;
    private String trainingSid;
    private long createdOn;
}
