package com.trainsoft.instructorled.customexception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends BaseException {
    private static final long serialVersionUID = 3241081191088969484L;

    public ResourceNotFoundException(Throwable e) {
        super(e);
    }

    public ResourceNotFoundException(ErrorCodes errorCoEnum) {
        this.errorCode = errorCoEnum;
    }

    public ResourceNotFoundException(ErrorCodes errorCoEnum, String devMsg) {
        this.errorCode = errorCoEnum;
        this.devMessage = devMsg;
    }
    public ResourceNotFoundException(Throwable e, ErrorCodes error) {
        this.e=e;
        this.errorCode=error;
    }
    public ResourceNotFoundException(String devMsg) {
        this.devMessage = devMsg;
    }

}
