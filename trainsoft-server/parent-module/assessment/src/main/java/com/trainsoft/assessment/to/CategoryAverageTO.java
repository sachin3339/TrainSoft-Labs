package com.trainsoft.assessment.to;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
@Setter @Getter
public class CategoryAverageTO implements Serializable {
    private static final long serialVersionUID = -5492069225323801657L;

    private Double averageScore;
    private CategoryTO categoryTO;
}
