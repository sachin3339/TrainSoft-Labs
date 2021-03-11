package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "vw_learners")
@Getter @Setter @NoArgsConstructor
public class LearnerView extends BaseEntity{
	@Column(name = "name")
	private String name;

	@Column(name = "emp_id")
	private String employeeId;

	@Column(name = "email")
	private String emailId;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name = "department_name")
	private String departmentName;
}
