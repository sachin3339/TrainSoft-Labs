package com.trainsoft.assessment.entity;

import com.trainsoft.assessment.enums.Status;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "category")
@Setter @Getter
public class Category extends BaseEntity{
    private static final long serialVersionUID = 8071594037998968845L;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;
}
