package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AssessmentDashboardTo
{

    private static final long serialVersionUID = -1899498920454684542L;

    private Date assessmentStartedOn;
    private Integer totalSubmitted;
    private Double assessAttendance;
    private Integer totalQuestions;
    private Double batchAvgScore;
    private Integer totalAttended;
    private List<AssessTo> assessToList;

}