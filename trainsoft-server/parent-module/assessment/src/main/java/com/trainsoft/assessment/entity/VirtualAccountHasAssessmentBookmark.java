package com.trainsoft.assessment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "virtual_account_has_assessment_bookmark")
@Getter
@Setter
@NoArgsConstructor
public class VirtualAccountHasAssessmentBookmark extends BaseEntity{

    private static final long serialVersionUID = -6505375572392114445L;
}
