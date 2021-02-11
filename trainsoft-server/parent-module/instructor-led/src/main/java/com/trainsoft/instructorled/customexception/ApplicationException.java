
package com.trainsoft.instructorled.customexception;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ApplicationException extends BaseException {

	private static final long serialVersionUID = -7223022474652068760L;

	public ApplicationException(Throwable e) {
		super(e);
	}
	public ApplicationException(Throwable e, String devMsg) {
		this.e=e;
		this.devMessage=devMsg;
	}
	public ApplicationException(ErrorCodes errorCoEnum) {
		this.errorCode = errorCoEnum;
	}

	public ApplicationException(ErrorCodes errorCoEnum, String devMsg) {
		this.errorCode = errorCoEnum;
		this.devMessage = devMsg;
	}
	public ApplicationException(Throwable e, ErrorCodes error) {
		this.e=e;
		this.errorCode=error;
	}

	public ApplicationException(String message) {
		this.devMessage = message;
	}
}
