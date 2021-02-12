package com.trainsoft.instructorled.commons;

import com.google.gson.Gson;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.regex.Pattern;

public class CommonUtils {
	private static final String REGEX = "^\\+(?:[0-9] ?){6,14}[0-9]$";
	private static final String USA_DIALING_CODE = "+1";
	private static final Logger logger = LoggerFactory.getLogger(CommonUtils.class);

	private CommonUtils() {
	}

	/**
	 * API to check whether String is empty or not.
	 *
	 * @param name
	 * @return boolean
	 */
	public static boolean isEmpty(String name) {
		boolean flag = true;
		if (name != null && !name.trim().isEmpty()) {
			flag = false;
		}
		return flag;
	}

	public static Function<String, String> addUSDialingCode = phoneNumber -> Pattern.compile(REGEX).asPredicate()
			.test(phoneNumber) ? phoneNumber : USA_DIALING_CODE.concat(phoneNumber);

	/**
	 * Verify that the param value for all the items in the list is not empty.
	 *
	 */
	public static Consumer<List<StringParamNotNullValidator>> verifyAllStringParams = e -> {

		e.stream().forEach(param -> Optional.ofNullable(param.getParam()).map(paramValue -> {
			if(StringUtils.isEmpty(paramValue))
				throw new IllegalArgumentException(String.format("%s must not be empty", param.getParamName()));
			return true;
		}).orElseThrow(()->new IllegalArgumentException(String.format("%s must not be empty", param.getParamName()))));
	};


	public static Supplier<Gson> gsonSupplier = Gson::new;

	public static Function<Object, String> toJsonFunction = gsonSupplier.get()::toJson;

	public static BiFunction<String,String,String> getProjectAttrName =
			(prefix,attributeName)->prefix.concat("-").concat(attributeName);

}
