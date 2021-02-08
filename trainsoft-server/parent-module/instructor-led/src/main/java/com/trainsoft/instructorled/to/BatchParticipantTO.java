package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Batch;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class BatchParticipantTO extends BaseTO{
    private String batchSid;
    private String virtualAccountSid;
}
