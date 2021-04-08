package com.trainsoft.instructorled.customexception;

public class IncorrectEmailException extends BaseException {
	private static final long serialVersionUID = 3241081181088969484L;

	public IncorrectEmailException(Throwable e) {
		super(e);
	}

	public IncorrectEmailException(ErrorCodes errorCoEnum) {
		this.errorCode = errorCoEnum;
	}

	public IncorrectEmailException(ErrorCodes errorCoEnum, String devMsg) {
		this.errorCode = errorCoEnum;
		this.devMessage = devMsg;
	}
	public IncorrectEmailException(Throwable e,ErrorCodes error) {
		this.e=e;
		this.errorCode=error;
	}
	public IncorrectEmailException(String devMsg) {
		this.devMessage = devMsg;
	}

}
