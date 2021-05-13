package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.VirtualAccount;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class VirtualAccountHasAssessmentBookMarkTo extends BaseTO
{

    private static final long serialVersionUID = 6020156508993691947L;

    @NonNull
    private Assessment assessment;
    @NonNull
    private VirtualAccount virtualAccount;
}
