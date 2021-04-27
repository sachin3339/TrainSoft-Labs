package com.trainsoft.assessment.config;

import com.trainsoft.assessment.customexception.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class AssessmentExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {
            UserNotFoundException.class,
            IllegalArgumentException.class,
            IllegalStateException.class,
            ApplicationException.class,
            RecordNotFoundException.class,
            IncorrectEmailException.class,
            UserNotFoundException.class,
            IncorrectEmailIdOrPasswordException.class,
            InvalidSidException.class
    })
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
        if (ex instanceof UserNotFoundException) {
            ErrorResponse errors = ErrorResponse.builder()
                    .status(HttpStatus.NO_CONTENT)
                    .message(ex.getMessage())
                    .error(ex.getLocalizedMessage()).build();
            return new ResponseEntity<>(errors, new HttpHeaders(), errors.getStatus());
        } else if (ex instanceof IncorrectEmailException) {
            ErrorResponse errors = ErrorResponse.builder()
                    .status(HttpStatus.NO_CONTENT)
                    .message(ex.getMessage())
                    .error(ex.getLocalizedMessage()).build();
            return new ResponseEntity<Object>(errors, new HttpHeaders(), errors.getStatus());
        } else if (ex instanceof ApplicationException){
            ErrorResponse errors = ErrorResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .message(((ApplicationException) ex).devMessage)
                    .error(ex.getLocalizedMessage()).build();
            return new ResponseEntity<Object>(errors, new HttpHeaders(), errors.getStatus());
        }else if(ex instanceof RecordNotFoundException) {
            ErrorResponse errors = ErrorResponse.builder()
                    .status(HttpStatus.NO_CONTENT)
                    .message(((RecordNotFoundException) ex).devMessage)
                    .error(ex.getLocalizedMessage()).build();
            return new ResponseEntity<Object>(errors,new HttpHeaders(),errors.getStatus());
        }else if(ex instanceof IncorrectEmailIdOrPasswordException) {
            ErrorResponse errors = ErrorResponse.builder()
                    .status(HttpStatus.UNAUTHORIZED)
                    .message(((IncorrectEmailIdOrPasswordException) ex).devMessage)
                    .error(ex.getLocalizedMessage()).build();
            return new ResponseEntity<Object>(errors,new HttpHeaders(),errors.getStatus());
        }else if(ex instanceof UserNotFoundException) {
            ErrorResponse errors = ErrorResponse.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .message(((UserNotFoundException) ex).devMessage)
                    .error(ex.getLocalizedMessage()).build();
            return new ResponseEntity<Object>(errors, new HttpHeaders(), errors.getStatus());
        }else if(ex instanceof InvalidSidException) {
                ErrorResponse errors = ErrorResponse.builder()
                        .status(HttpStatus.UNAUTHORIZED)
                        .message(((InvalidSidException) ex).devMessage)
                        .error(ex.getLocalizedMessage()).build();
                return new ResponseEntity<>(errors, new HttpHeaders(), errors.getStatus());
        } else {
            ErrorResponse errors = ErrorResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .message(ex.getMessage())
                    .error(ex.getLocalizedMessage()).build();
            return new ResponseEntity<>(errors, new HttpHeaders(), errors.getStatus());
        }
    }
}
