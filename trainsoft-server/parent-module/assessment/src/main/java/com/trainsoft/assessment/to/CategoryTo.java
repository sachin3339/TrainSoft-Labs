package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.entity.Tag;
import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter @Getter
public class CategoryTO extends BaseTO{
    private static final long serialVersionUID = 5139359445642795894L;

    private String name;
    private AssessmentEnum.Status status;
    private List<Tag> tags;

}