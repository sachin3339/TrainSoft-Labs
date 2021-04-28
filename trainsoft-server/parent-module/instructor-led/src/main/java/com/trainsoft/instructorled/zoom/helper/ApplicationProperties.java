package com.trainsoft.instructorled.zoom.helper;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Data
@ConfigurationProperties("app")
@Configuration
@Component
@Setter@Getter
public class ApplicationProperties {
    private Zoom zoom;

    @Data
    public static class Zoom {
        private String clientId;
        private String clientSecret;
        private String redirectUrl;
        private String accessToken;
        private String userId;
        private String password;
        private Integer type;
        private String zoomSettingSid;
        private String companySid;
        private String departmentSid;
    }
}
