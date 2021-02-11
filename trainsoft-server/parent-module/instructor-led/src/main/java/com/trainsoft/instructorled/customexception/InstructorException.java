package com.trainsoft.instructorled.customexception;

import lombok.*;
import org.springframework.http.HttpStatus;

@Builder
@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
public class InstructorException extends RuntimeException {
    private HttpStatus status;
    private String message;
    private String error;
}

