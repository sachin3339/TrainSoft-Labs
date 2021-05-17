package com.trainsoft.assessment.to;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
@Setter @Getter
public class MyAssessmentsCountTO implements Serializable {
    private static final long serialVersionUID = -2216372681240932220L;
    private Integer all;
    private Integer onGoing;
    private Integer completed;
    private  Integer quit;
}
