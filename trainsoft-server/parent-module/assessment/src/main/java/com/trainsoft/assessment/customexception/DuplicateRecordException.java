package com.trainsoft.assessment.customexception;

public class DuplicateRecordException extends BaseException
{
    private static final long serialVersionUID = -225754982905106530L;


    public  DuplicateRecordException(Throwable e) {
        super(e);
    }

    public  DuplicateRecordException(ErrorCodes errorCoEnum) {
        this.errorCode = errorCoEnum;
    }

    public  DuplicateRecordException(ErrorCodes errorCoEnum, String devMsg) {
        this.errorCode = errorCoEnum;
        this.devMessage = devMsg;
    }
    public DuplicateRecordException(Throwable e,ErrorCodes error) {
        this.e=e;
        this.errorCode=error;
    }
    public  DuplicateRecordException(String devMsg) {
        this.devMessage = devMsg;
    }
}
