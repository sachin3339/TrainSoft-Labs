package com.trainsoft.instructorled.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "company")
@Getter @Setter @NoArgsConstructor
public class Company extends BaseEntity{
	@Column(name = "name")
	private String name;

	@Column(name = "email")
	private String emailId;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name="created_on")
	private Date createdOn;

	@Column(name="updated_on")
	private Date updatedOn;

	@ManyToOne
	@JoinColumn(name = "created_by", referencedColumnName = "id")
	private VirtualAccount createdBy;

	@ManyToOne
	@JoinColumn(name = "updated_by", referencedColumnName = "id")
	private VirtualAccount updatedBy;
}
