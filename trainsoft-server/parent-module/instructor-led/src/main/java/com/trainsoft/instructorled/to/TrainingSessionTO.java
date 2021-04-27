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

    private String topic;
    private String agenda;
    private InstructorEnum.Status status;
    private String assets;
    private String recording;
    private Long startTime;
    private Long endTime;
    private Long createdOn;
    private String courseSid;
    private String trainingSid;
    private String createdByVASid;
    private Long updatedOn;
    private String updatedByVASid;
    private String companySid;
    private String courseSessionSid;
    private String meetingInfo;
    private Integer duration;
    private String  schedule_for;
}
