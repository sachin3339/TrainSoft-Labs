package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrainingSessionTO extends BaseTO {

    private String agendaName;
    private String agendaDescription;
    private InstructorEnum.Status status;
    private String assets;
    private String recording;
    private long sessionDate;
    private long startTime;
    private long endTime;
    private long createdOn;
    private String courseSid;
    private String trainingSid;
    private String createdByVASid;
    private long updatedOn;
    private String updatedByVASid;
    private String companySid;
}
