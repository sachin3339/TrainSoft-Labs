package com.trainsoft.assessment.controller;


import com.trainsoft.assessment.commons.JWTDecode;
import com.trainsoft.assessment.commons.JWTTokenTO;
import com.trainsoft.assessment.service.ITopicService;
import com.trainsoft.assessment.to.TopicTo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@AllArgsConstructor
@RestController
@Api(value = "Topic related API's")
@RequestMapping("/v1")
public class TopicController {

    ITopicService topicService;

    @PostMapping("/create/topic")
    @ApiOperation(value = "createTopic", notes = "API to create new Topic.")
    public ResponseEntity<?> createTopic(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Topic payload", required = true) @RequestBody TopicTo topicTo)
    {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        topicTo.setCompanySid(jwt.getCompanySid());
        topicTo.setCreatedByVirtualAccountSid(jwt.getVirtualAccountSid());
        return ResponseEntity.ok(topicService.createTopic(topicTo));
    }

    @PostMapping("/display/topics")
    @ApiOperation(value = "displayTopics", notes = "API to get Topics.")
    public ResponseEntity<?> displayTopics()
    {
        return ResponseEntity.ok(topicService.getAllTopics());
    }
}
