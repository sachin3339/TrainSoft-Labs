package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AssessTo
{

    private static final long serialVersionUID = -2936641505732833904L;

    private String name;
    private String email;
    private String status;
    private Date submittedOn;
    private Double score;

}
