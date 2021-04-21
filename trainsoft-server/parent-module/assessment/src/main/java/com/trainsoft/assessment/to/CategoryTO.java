package com.trainsoft.assessment.to;

import com.trainsoft.assessment.enums.Status;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class CategoryTO extends BaseTO{
    private static final long serialVersionUID = 5139359445642795894L;

    private String name;
    private Status status;
}
