package com.trainsoft.assessment.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = {"com.trainsoft.assessment.repository", "com.trainsoft.assessment.commons"})
public class PersistenceConfig {
}
