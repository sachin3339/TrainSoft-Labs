package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.VirtualAccount;
import com.trainsoft.assessment.value.AssessmentEnum;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class VirtualAccountAssessmentTo extends BaseTO{

    private String assessmentSid;
    private String virtualAccountSid;
}
