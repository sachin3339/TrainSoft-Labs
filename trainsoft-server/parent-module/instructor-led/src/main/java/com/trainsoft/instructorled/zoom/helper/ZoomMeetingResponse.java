package com.trainsoft.instructorled.zoom.helper;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter@Getter
@JsonPropertyOrder({
        "id",
        "agenda",
        "topic",
        "start_time",
        "duration",
        "timezone",
        "host_email",
        "start_url",
        "join_url",
        "password",
        "type",
        "uuid",
        "created_at",
        "user_id",
        "personal_meeting_url"
})
public class ZoomMeetingResponse implements Serializable {
    @JsonProperty("id")
    long meetingId;
    @JsonProperty("created_at")
    String createdAt;
    @JsonProperty("duration")
    int duration;
    @JsonProperty("host_id")
    String hostId;
    @JsonProperty("host_email")
    String hostEmail;
    @JsonProperty("join_url")
    String joinUrl;
    @JsonProperty("start_time")
    String startTime;
    @JsonProperty("start_url")
    String startUrl;
    @JsonProperty("status")
    String status;
    @JsonProperty("timezone")
    String timezone;
    @JsonProperty("topic")
    String topic;
    @JsonProperty("type")
    int type;
    @JsonProperty("uuid")
    String uuid;
    @JsonProperty("agenda")
    private String agenda;
    @JsonProperty("personal_meeting_url")
    private String personalMeetingUrl;
}
