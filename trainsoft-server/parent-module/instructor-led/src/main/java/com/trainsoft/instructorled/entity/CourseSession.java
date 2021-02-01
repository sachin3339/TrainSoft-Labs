package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "course_session")
@Getter @Setter @NoArgsConstructor
public class CourseSession extends BaseEntity{
	@Column(name = "agenda_name")
	private String agendaName;

	@Column(name = "agenda_description")
	private String agendaDescription;

	@Column(name = "assets")
	private String assets;

	@Column(name = "recording")
	private String recording;

	@Column(name="status")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.Status status;

	@Column(name="training_type")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.TrainingType trainingType;

	@Column(name="session_date")
	private Date sessionDate;

	@Column(name="start_time")
	private Date startTime;

	@Column(name="end_time")
	private Date endTime;

	@Column(name="created_on")
	private Date createdOn;

	@ManyToOne
	@JoinColumn(name = "course_id", referencedColumnName = "id")
	private Course course;

	@ManyToOne
	@JoinColumn(name = "created_by", referencedColumnName = "id")
	private VirtualAccount createdBy;
}
