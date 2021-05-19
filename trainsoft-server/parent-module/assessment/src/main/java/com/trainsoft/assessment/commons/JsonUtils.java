package com.trainsoft.assessment.commons;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class JsonUtils {
	private static final Logger logger = LoggerFactory.getLogger(JsonUtils.class);

	private static final ObjectMapper jsonMapper = new ObjectMapper();
	private static final Gson gson = new Gson();
	private static final Gson gson1 = new GsonBuilder().setPrettyPrinting().create();
	
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

	public static <T> String toJsonStringFromList(T t){
		try {
			String json = gson1.toJson(t);
			return json;
		}
		catch (Exception e) {
			logger.error("Error at toJsonString - {}",e);
			return null;
		}
	}
}
