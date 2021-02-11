
package com.trainsoft.instructorled.customexception;

import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class CommonHttpException extends BaseException{
    private Integer responseCode;
    private String responseMessage;
}
