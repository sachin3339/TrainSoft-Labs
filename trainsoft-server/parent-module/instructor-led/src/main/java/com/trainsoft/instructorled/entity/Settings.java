package com.trainsoft.instructorled.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "zoom_settings")
@Getter @Setter @NoArgsConstructor
public class Settings extends BaseEntity {
    private static final long serialVersionUID = -6505375572391014445L;
    @Column(name = "host_video")
    private boolean host_video;

    @Column(name = "paricipant_video")
    private boolean participant_video;

    @Column(name="join_before_host")
    private boolean join_before_host;

    @Column(name="mute_upon_entry")
    private boolean mute_upon_entry;

    @Column(name="auto_recording")
    private String auto_recording;
}
