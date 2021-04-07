package com.trainsoft.instructorled.customexception;

public class IncorrectEmailIdOrPasswordException extends BaseException {

	private static final long serialVersionUID = 3241081181088969484L;

	public IncorrectEmailIdOrPasswordException(Throwable e) {
		super(e);
	}

	public IncorrectEmailIdOrPasswordException(ErrorCodes errorCoEnum) {
		this.errorCode = errorCoEnum;
	}

	public IncorrectEmailIdOrPasswordException(ErrorCodes errorCoEnum, String devMsg) {
		this.errorCode = errorCoEnum;
		this.devMessage = devMsg;
	}
	public IncorrectEmailIdOrPasswordException(Throwable e,ErrorCodes error) {
		this.e=e;
		this.errorCode=error;
	}
	public IncorrectEmailIdOrPasswordException(String devMsg) {
		this.devMessage = devMsg;
	}

}
