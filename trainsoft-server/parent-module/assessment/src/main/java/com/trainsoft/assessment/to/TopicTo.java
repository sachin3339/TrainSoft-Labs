package com.trainsoft.assessment.to;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TopicTo extends BaseTO{

    private static final long serialVersionUID = 6366560830768809582L;
    
    private String name;
    private String description;
    private AssessmentEnum.Status status;
    private boolean isPaymentReceived;
    private double price;
    private int noOfAssessments;
    private String createdByVirtualAccountSid;
    private String companySid;
    private Date createdOn;
}