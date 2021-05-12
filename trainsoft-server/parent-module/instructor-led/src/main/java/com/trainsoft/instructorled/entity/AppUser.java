package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "appusers")
@Getter @Setter @NoArgsConstructor
@AllArgsConstructor
public class AppUser extends BaseEntity{
	private static final long serialVersionUID = -2651480037730326794L;
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

	@Column(name = "password")
	private String password;

	@Column(name = "tp_token")
	private String tpToken;

	@Column(name = "expiry_date")
	private Date expiryDate;

	@Column(name = "is_reset")
	private boolean resetPassword;
}
