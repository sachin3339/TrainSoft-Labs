package com.trainsoft.assessment.service;

import com.trainsoft.assessment.commons.JWTTokenTO;
import com.trainsoft.assessment.to.TopicTo;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ITopicService {

    TopicTo createTopic(TopicTo topicTo);
    List<TopicTo> getAllTopics(JWTTokenTO jwtTokenTO, Pageable pageRequest);
}
