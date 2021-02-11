package com.trainsoft.instructorled.commons;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

public class DateUtils {
	private static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	private static final String TIMEZONE = "UTC";

	public static Date getCurrentDate() {
		Date currentDate = new Date();
		return currentDate;
	}

	public static Long getTimeStampByCurrentDate() {
		SimpleDateFormat isoFormat = new SimpleDateFormat(DATE_FORMAT);
		isoFormat.setTimeZone(TimeZone.getTimeZone(TIMEZONE));
		Date d = new Date();
		String currentUtcTime = isoFormat.format(d);
		return Timestamp.valueOf(currentUtcTime).getTime();
	}
}
