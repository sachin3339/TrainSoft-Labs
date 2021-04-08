package com.trainsoft.instructorled.customexception;

public class RecordNotFoundException extends BaseException {


	private static final long serialVersionUID = 3241081181088969484L;

	public RecordNotFoundException(Throwable e) {
		super(e);
	}

	public RecordNotFoundException(ErrorCodes errorCoEnum) {
		this.errorCode = errorCoEnum;
	}

	public RecordNotFoundException(ErrorCodes errorCoEnum, String devMsg) {
		this.errorCode = errorCoEnum;
		this.devMessage = devMsg;
	}
	public RecordNotFoundException(Throwable e,ErrorCodes error) {
		this.e=e;
		this.errorCode=error;
	}
	public RecordNotFoundException(String devMsg) {
		this.devMessage = devMsg;
	}

}
