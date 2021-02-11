package com.trainsoft.instructorled.customexception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class InstructorExceptionAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {
           // InvalidTokenException.class,
            InstructorException.class,
            IllegalArgumentException.class,
            IllegalStateException.class
    })
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
/*        if (ex instanceof InvalidTokenException) {
            return ResponseEntity.status(400).body("Invalid Token");
        } else*/ if (ex instanceof InstructorException) {
            InstructorException errors = InstructorException.builder().status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .message("Something went wrong").error(ex.getLocalizedMessage()).build();
            return new ResponseEntity<Object>(errors, new HttpHeaders(), errors.getStatus());
        } else {
            return ResponseEntity.status(500).body("Something went wrong.");
        }
    }
}
