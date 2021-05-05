package com.trainsoft.assessment.entity;


import com.trainsoft.assessment.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "department_has_virtual_account")
@Getter @Setter @NoArgsConstructor
public class DepartmentVirtualAccount extends BaseEntity {

    @Column(name="department_role")
    @Enumerated(EnumType.STRING)
    private InstructorEnum.DepartmentRole departmentRole;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id",nullable = false)
    private Department department;

    @ManyToOne
    @JoinColumn(name = "virtual_acoount_id", referencedColumnName = "id",nullable = false)
    private VirtualAccount virtualAccount;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;
}
