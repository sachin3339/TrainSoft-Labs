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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @GetMapping("/display/topics")
    @ApiOperation(value = "displayTopics", notes = "API to get Topics.")
    public ResponseEntity<?> displayTopics(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            Pageable pageable)
    {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(topicService.getAllTopics(jwt.getCompanySid(),pageable));
    }

    @PutMapping("/update/topic")
    @ApiOperation(value = "updateTopic", notes = "API to update Topic based on Topic Sid and Topic Name.")
    public ResponseEntity<?> updateTopic(@ApiParam(value = "Update Topic payload", required = true) @RequestBody TopicTo topicTo)
    {
        return ResponseEntity.ok(topicService.updateTopic(topicTo.getSid(),topicTo.getName()));
    }

    @DeleteMapping("/delete/topic/{tSid}")
    @ApiOperation(value = "deleteTopic", notes = "API to delete Topic based on Topic Sid.")
    public ResponseEntity<?> deleteTopic(@ApiParam("Topic Sid") @PathVariable(value = "tSid") String topicSid)
    {
        return ResponseEntity.ok(topicService.softDeleteTopic(topicSid));
    }


}