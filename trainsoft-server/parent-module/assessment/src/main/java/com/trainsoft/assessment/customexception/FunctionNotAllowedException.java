package com.trainsoft.assessment.customexception;

public class FunctionNotAllowedException extends BaseException{
    private static final long serialVersionUID = -6445634172347867596L;

    public FunctionNotAllowedException(Throwable e) {
        super(e);
    }

    public FunctionNotAllowedException(ErrorCodes errorCoEnum) {
        this.errorCode = errorCoEnum;
    }

    public FunctionNotAllowedException(ErrorCodes errorCoEnum, String devMsg) {
        this.errorCode = errorCoEnum;
        this.devMessage = devMsg;
    }
    public FunctionNotAllowedException(Throwable e,ErrorCodes error) {
        this.e=e;
        this.errorCode=error;
    }
    public FunctionNotAllowedException(String devMsg) {
        this.devMessage = devMsg;
    }
}
