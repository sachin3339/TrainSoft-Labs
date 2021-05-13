package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class BatchParticipantTO extends BaseTO{
    private static final long serialVersionUID = 706277689116556158L;
    private String batchSid;
    private String virtualAccountSid;
}
