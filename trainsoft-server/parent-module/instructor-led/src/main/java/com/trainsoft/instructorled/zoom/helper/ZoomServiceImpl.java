package com.trainsoft.instructorled.zoom.helper;

import com.trainsoft.instructorled.customexception.ResourceNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.TrainingSession;
import com.trainsoft.instructorled.repository.ISettingRepository;
import com.trainsoft.instructorled.repository.ITrainingSessionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@AllArgsConstructor
public class ZoomServiceImpl {

    //private String type;
    private final ITrainingSessionRepository sessionRepository;
    private final DozerUtils mapper;
    private final ZoomApiIntegrationServiceImpl zoomApiIntegrationServiceImpl;
    private final ISettingRepository settingRepository;

    public ZoomMeetingResponse createMeetingWithAccessToken(TrainingSession trainingSession,String accessToken) {
        ClientResponse clientResponse = zoomApiIntegrationServiceImpl.callCreateMeetingApi(trainingSession, accessToken);
        Mono<ZoomMeetingResponse> zoomMeetingResponse = clientResponse.bodyToMono(ZoomMeetingResponse.class);
        ZoomMeetingResponse meetingDetailsResponseToUse = zoomMeetingResponse.block();
        return meetingDetailsResponseToUse;
    }

    public ZoomMeetingResponse updateMeetingWithAccessToken(TrainingSession trainingSession, String meetingId, String accessToken) {
        ClientResponse clientResponse = zoomApiIntegrationServiceImpl.callUpdateMeetingApi(trainingSession,meetingId,accessToken);
        if (clientResponse.statusCode().isError()) {
            throw new ResourceNotFoundException("Failed to update meeting. Error = " + clientResponse.statusCode().value());
        } else {
            Mono<ZoomMeetingResponse> zoomMeetingResponse = clientResponse.bodyToMono(ZoomMeetingResponse.class);
            ZoomMeetingResponse meetingDetailsResponse = zoomMeetingResponse.block();
            return meetingDetailsResponse;
        }
    }

    public boolean deleteMeetingWithAccessToken(String meetingId, String accessToken) {

        ClientResponse clientResponse = zoomApiIntegrationServiceImpl.callDeleteMeetingApi(meetingId,accessToken);
        if (clientResponse.statusCode().isError()) {
            throw new ResourceNotFoundException("Failed to delete meeting. Error = " + clientResponse.statusCode().value());
        } else {
          return true;
        }
    }

    public ZoomMeetingResponse getMeetingDetails(String meetingId, String accessToken) {

        ClientResponse clientResponse = zoomApiIntegrationServiceImpl.callGetMeetingApi(meetingId,accessToken);
        if (clientResponse.statusCode().isError()) {
            throw new ResourceNotFoundException("Failed to delete meeting. Error = " + clientResponse.statusCode().value());
        } else {
            Mono<ZoomMeetingResponse> zoomMeetingResponse = clientResponse.bodyToMono(ZoomMeetingResponse.class);
            ZoomMeetingResponse meetingDetailsResponseToUse = zoomMeetingResponse.block();
            return meetingDetailsResponseToUse;
        }
    }

}
