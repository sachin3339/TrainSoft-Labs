package com.trainsoft.assessment.to;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
@Setter @Getter
public class ScoreBoardTO implements Serializable {
    private static final long serialVersionUID = -1524583764909145083L;

    private Double yourScore;
    private Integer yourRankToday;
    private Integer totalAttendeesToday;
    private Integer yourRankAllTime;
    private Integer totalAttendeesAllTime;
}
