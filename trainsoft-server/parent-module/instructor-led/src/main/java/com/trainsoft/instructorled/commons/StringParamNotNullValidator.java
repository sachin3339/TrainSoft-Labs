package com.trainsoft.instructorled.commons;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StringParamNotNullValidator {
    public String param;
    public String paramName;
}
