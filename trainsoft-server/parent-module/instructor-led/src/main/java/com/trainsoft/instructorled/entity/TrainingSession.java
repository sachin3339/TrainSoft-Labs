package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Table(name = "training_session")
@Getter @Setter @NoArgsConstructor
public class TrainingSession extends BaseEntity {
	@Column(name = "agenda_name")
	private String topic;

	@Column(name = "agenda_description")
	private String agenda;

	@Column(name="status")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.Status status;

	@Column(name = "assets")
	private String assets;

	@Column(name = "recording")
	private String recording;

	@Column(name="session_date")
	private String start_time;

	@Column(name="start_time")
	private Instant startTime;

	@Column(name="end_time")
	private Instant endTime;

	@Column(name="created_on")
	private Date createdOn;

	@Column(name="updated_on")
	private Date updatedOn;

	@ManyToOne
	@JoinColumn(name = "training_id", referencedColumnName = "id")
	private Training training;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "course_id", referencedColumnName = "id")
	private Course course;

	@ManyToOne
	@JoinColumn(name = "created_by", referencedColumnName = "id")
	private VirtualAccount createdBy;

	@ManyToOne
	@JoinColumn(name = "updated_by", referencedColumnName = "id")
	private VirtualAccount updatedBy;

	@ManyToOne
	@JoinColumn(name = "company_id", referencedColumnName = "id")
	private Company company;

	@Column(name="course_session_sid")
	private String courseSessionSid;

	@Column(name="meeting_info")
	private String meetingInfo;

	@Column(name="password")
	private String password;

	@Column(name="user_id")
	private String userId;

	@Column(name="type")
	private Integer type;

	@Column(name="duration")
	private Integer duration;

	@OneToOne
	@JoinColumn(name = "zoom_setting_id", referencedColumnName = "id")
	private Settings settings;
}
