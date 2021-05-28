package com.trainsoft.assessment.entity;


import com.trainsoft.assessment.enums.QuizStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "virtual_account_has_assessment")
@Getter
@Setter
@NoArgsConstructor
public class VirtualAccountAssessment extends BaseEntity{

    private static final long serialVersionUID = -7750061562585164419L;

    @ManyToOne
    @JoinColumn(name = "quiz_set_id", referencedColumnName = "id",nullable = false)
    private Assessment assessment;

    @ManyToOne
    @JoinColumn(name = "virtual_account_id", referencedColumnName = "id",nullable = false)
    private VirtualAccount virtualAccount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private QuizStatus status;

}
