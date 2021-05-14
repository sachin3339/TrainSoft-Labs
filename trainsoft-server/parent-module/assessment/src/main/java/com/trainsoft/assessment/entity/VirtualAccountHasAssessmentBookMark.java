package com.trainsoft.assessment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "virtual_account_has_assessment_bookmark")
@Getter
@Setter
@NoArgsConstructor
public class VirtualAccountHasAssessmentBookMark extends BaseEntity
{

    private static final long serialVersionUID = -6505375572392114445L;

    @ManyToOne
    @JoinColumn(name = "quiz_set_id", referencedColumnName = "id",nullable = false)
    private Assessment assessment;

    @ManyToOne
    @JoinColumn(name = "virtual_account_id", referencedColumnName = "id",nullable = false)
    private VirtualAccount virtualAccount;
}