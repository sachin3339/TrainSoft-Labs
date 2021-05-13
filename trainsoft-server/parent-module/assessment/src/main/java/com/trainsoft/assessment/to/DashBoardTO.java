package com.trainsoft.assessment.to;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
@Setter @Getter
public class DashBoardTO implements Serializable {
    private static final long serialVersionUID = 2535200791059105293L;
    private Integer assessmentTaken;
    private Integer onGoing;
    private Integer completed;
    private Integer quit;
    private Integer yourScore;
}
