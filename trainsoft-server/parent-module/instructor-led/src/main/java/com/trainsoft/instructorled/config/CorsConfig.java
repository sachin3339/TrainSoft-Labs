package com.trainsoft.instructorled.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class CorsConfig implements WebMvcConfigurer {
 
    @Value("*")
    private String corsOrigins;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
    	String mappingPattern = "/**";
    	registry
                .addMapping(mappingPattern).allowedMethods("HEAD","PUT","POST","GET","DELETE","OPTIONS","PATCH");
    	log.info(String.format("CORS configuration set to %s for mapping %s", corsOrigins, mappingPattern));
    }
}