package com.trainsoft.instructorled.to;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class SettingTO extends BaseTO {
    private static final long serialVersionUID = 8909306331014635054L;
    private boolean host_video;
    private boolean paricipant_video;
    private boolean join_before_host;
    private boolean mute_upon_entry;
    private String auto_recording;
}
