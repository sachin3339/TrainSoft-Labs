package com.trainsoft.instructorled.entity;

import javax.persistence.*;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "department_has_virtual_account")
@Getter @Setter @NoArgsConstructor
public class DepartmentVirtualAccount extends BaseEntity {

    private static final long serialVersionUID = -744513085619921647L;
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
