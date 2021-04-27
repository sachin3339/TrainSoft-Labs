package com.trainsoft.assessment.entity;

import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
public class Category extends BaseEntity{


    @Column(name = "name",nullable = false)
    private String name;

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private AssessmentEnum.Status status;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "categoryId")
    private List<Tag>  tags = new ArrayList<>();

}
