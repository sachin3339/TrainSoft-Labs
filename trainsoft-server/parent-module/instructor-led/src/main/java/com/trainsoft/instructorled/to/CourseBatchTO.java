package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Batch;
import com.trainsoft.instructorled.entity.Course;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CourseBatchTO extends BaseTO{

    private String batchSid;
    private String courseSid;
    private long createdOn;
}
