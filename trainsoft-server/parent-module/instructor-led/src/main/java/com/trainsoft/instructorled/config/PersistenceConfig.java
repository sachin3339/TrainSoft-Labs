package com.trainsoft.instructorled.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = {"com.trainsoft.instructorled.repository", "com.trainsoft.instructorled.commons"})
public class PersistenceConfig {
}
