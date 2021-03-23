package com.trainsoft.instructorled.config;

import com.trainsoft.instructorled.customexception.IncorrectEmailIdOrPasswordException;
import com.trainsoft.instructorled.customexception.InstructorException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.customexception.UserNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
@ControllerAdvice
@Slf4j
public class InstructorLedExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { UserNotFoundException.class,
            RecordNotFoundException.class })

    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
        InstructorException exceptionDetails = new InstructorException();
        if (ex instanceof UserNotFoundException) {
            exceptionDetails.setStatus(HttpStatus.UNAUTHORIZED);
            exceptionDetails.setMessage("User not found");
            exceptionDetails.setTimestamp(LocalDateTime.now());
            return new ResponseEntity<Object>(exceptionDetails, HttpStatus.UNAUTHORIZED);
        } else if (ex instanceof IncorrectEmailIdOrPasswordException) {
            exceptionDetails.setStatus(HttpStatus.UNAUTHORIZED);
            exceptionDetails.setMessage("Please enter the valid username and password.");
            exceptionDetails.setTimestamp(LocalDateTime.now());
            return new ResponseEntity<Object>(exceptionDetails, HttpStatus.UNAUTHORIZED);
        } else if (ex instanceof RecordNotFoundException) {
            exceptionDetails.setStatus(HttpStatus.NO_CONTENT);
            exceptionDetails.setMessage("No record found.");
            exceptionDetails.setTimestamp(LocalDateTime.now());
            return new ResponseEntity<Object>(exceptionDetails, HttpStatus.NO_CONTENT);
        } else {
            log.info(String.valueOf(ex));
            return ResponseEntity.status(500).body("Something went wrong.");
        }
    }
}
