package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "appusers")
@Getter @Setter @NoArgsConstructor
public class AppUser extends BaseEntity{
	@Column(name = "name")
	private String name;

	@Column(name = "email")
	private String emailId;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name="is_superadmin")
	private boolean superAdmin;

	@Column(name="status")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.Status status;

	@Column(name = "emp_id")
	private String employeeId;

	@Column(name="access_level")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.AccessType accessType;
}
