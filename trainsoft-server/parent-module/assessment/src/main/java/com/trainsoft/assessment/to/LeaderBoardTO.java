package com.trainsoft.assessment.to;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
@Setter @Getter
public class LeaderBoardTO implements Serializable {

    private static final long serialVersionUID = -8700617263488244538L;
    private Double percentage;
    private VirtualAccountTO virtualAccountTO;

}
