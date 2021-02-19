package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CourseSessionTO extends BaseTO{
    private String topicName;
    private String topicDescription;
    private long createdOn;
    private String createdByVASid;
    private long updatedOn;
    private String updatedByVASid;
    private String courseSid;
}
