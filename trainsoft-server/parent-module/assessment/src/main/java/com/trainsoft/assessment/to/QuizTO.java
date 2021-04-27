package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.VirtualAccount;
import com.trainsoft.assessment.enums.Status;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;

@Setter @Getter
public class QuizTO extends BaseTO{
    private static final long serialVersionUID = -8633936147312648829L;

    private String name;

    private String description;

    private Status status;

    private VirtualAccountTO createdBy;

    private Instant createdOn;

    private VirtualAccountTO updatedBy;

    private Instant updatedOn;

    private CompanyTO companyId;

    private  boolean isPaymentReceived;

    private Double price;
}
