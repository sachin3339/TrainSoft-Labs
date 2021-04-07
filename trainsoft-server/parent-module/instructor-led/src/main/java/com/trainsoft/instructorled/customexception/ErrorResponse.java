package com.trainsoft.instructorled.customexception;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.io.Serializable;
import java.time.LocalDateTime;

@Setter @Getter
@AllArgsConstructor
@Builder
public class ErrorResponse implements Serializable {
    private static final long serialVersionUID = 938213931489215850L;
    private HttpStatus status;
    private String message;
    private String error;
}

