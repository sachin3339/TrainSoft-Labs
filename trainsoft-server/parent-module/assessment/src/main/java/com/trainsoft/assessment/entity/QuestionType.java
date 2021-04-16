package com.trainsoft.assessment.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "question_type")
@Getter
@Setter
@NoArgsConstructor
public class QuestionType extends BaseEntity{

    @Column(name = "name")
    private String name;

    @Column(name = "status")
    private String status;

    @Column(name = "value")
    private String value;
}
