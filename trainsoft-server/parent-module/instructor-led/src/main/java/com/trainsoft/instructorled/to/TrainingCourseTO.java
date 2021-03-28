package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.Course;
import com.trainsoft.instructorled.entity.VirtualAccount;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrainingCourseTO extends BaseTO{

    private String trainingSid;
    private String courseSid;
    private String assets;
    private String recording;
    private long sessionDate;
    private long startTime;
    private long endTime;
    private Date createdOn;
    private Date updatedOn;
    private String createdByVASid;
    private String updatedByVASid;
    private Company companySid;
}
