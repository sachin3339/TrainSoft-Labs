package com.trainsoft.instructorled.commons;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class JsonUtils {
	private static final Logger logger = LoggerFactory.getLogger(JsonUtils.class);

	private static final ObjectMapper jsonMapper = new ObjectMapper();
	private static final Gson gson = new Gson();
	
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
	public static <T> String toJsonString(T t){
		try {
			String json = gson.toJson(t);
			return json;
		}
		catch (Exception e) {
			logger.error("Error at toJsonString - {}",e);
			return null;
		}
	}
}
