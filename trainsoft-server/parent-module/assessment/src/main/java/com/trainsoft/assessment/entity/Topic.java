package com.trainsoft.assessment.entity;


import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "quiz")
@Getter
@Setter
@NoArgsConstructor
public class Topic extends BaseEntity
{
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AssessmentEnum.Status status;

    @Column(name = "is_payment_received")
    private boolean isPaymentReceived;

    @Column(name = "price")
    private double price;

    @Column(name="created_on")
    private Date createdOn;

    @Column(name="updated_on")
    private Date updatedOn;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private VirtualAccount createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id")
    private VirtualAccount updatedBy;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "topicId")
    private List<Assessment> assessments  = new ArrayList<>();

}
