package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Course;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CourseSessionTO extends BaseTO{

    private String agendaName;
    private String agendaDescription;
    private String assets;
    private String recording;
    private InstructorEnum.Status status;
    private InstructorEnum.TrainingType trainingType;
    private long sessionDate;
    private long startTime;
    private long endTime;
    private long createdOn;
    private String courseSid;
    private String createdByVASid;
}
