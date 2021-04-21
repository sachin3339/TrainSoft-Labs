package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
@Setter @Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class InstructionsRequestTO implements Serializable {
    private static final long serialVersionUID = -6494702257196057187L;

    private String createdBySid;
    private  String difficulty;
    private String categorySid;
}
