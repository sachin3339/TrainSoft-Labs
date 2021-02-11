package com.trainsoft.instructorled.commons;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class JsonUtils {
	private static final Logger logger = LoggerFactory.getLogger(JsonUtils.class);

	private static final ObjectMapper jsonMapper = new ObjectMapper();
	
	public static String toJson(Object object) {
		try {
			return jsonMapper.writeValueAsString(object);
		}
		catch (Exception e) {
			return null;
		}
	}

	public static <T> T fromJson(String json, Class<T> clazz) {
		try {
			return jsonMapper.readValue(json, clazz);
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
