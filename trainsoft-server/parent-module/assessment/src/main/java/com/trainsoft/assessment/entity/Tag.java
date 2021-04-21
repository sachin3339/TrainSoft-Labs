package com.trainsoft.assessment.entity;

import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tags")
@Getter
@Setter
@NoArgsConstructor
public class Tag extends BaseEntity
{
    @Column(name = "name",nullable = false)
    private String name;

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private AssessmentEnum.Status status;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", referencedColumnName = "id",nullable = false)
    private Category categoryId;
}
