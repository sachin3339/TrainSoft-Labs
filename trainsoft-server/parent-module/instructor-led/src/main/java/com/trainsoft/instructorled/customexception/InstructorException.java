package com.trainsoft.instructorled.customexception;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
public class InstructorException {
    private HttpStatus status;
    private String message;
    private LocalDateTime timestamp;
}

