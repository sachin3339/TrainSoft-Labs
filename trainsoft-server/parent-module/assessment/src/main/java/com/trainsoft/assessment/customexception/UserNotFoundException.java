package com.trainsoft.assessment.customexception;

public class UserNotFoundException extends BaseException {

	private static final long serialVersionUID = -1655475969683570898L;

	public UserNotFoundException(Throwable e) {
		super(e);
	}

	public UserNotFoundException(ErrorCodes errorCoEnum) {
		this.errorCode = errorCoEnum;
	}

	public UserNotFoundException(ErrorCodes errorCoEnum, String devMsg) {
		this.errorCode = errorCoEnum;
		this.devMessage = devMsg;
	}
	public UserNotFoundException(Throwable e,ErrorCodes error) {
		this.e=e;
		this.errorCode=error;
	}
	public UserNotFoundException(String devMsg) {
		this.devMessage = devMsg;
	}

}
