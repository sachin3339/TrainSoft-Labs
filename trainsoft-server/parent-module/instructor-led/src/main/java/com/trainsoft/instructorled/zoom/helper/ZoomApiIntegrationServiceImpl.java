package com.trainsoft.instructorled.zoom.helper;

import com.trainsoft.instructorled.entity.TrainingSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class ZoomApiIntegrationServiceImpl {
    private final  ApplicationProperties applicationProperties;
     ZoomDetails zoomDetails= new ZoomDetails();

    @Bean
    public WebClient getWebClient() {
        return (WebClient.builder().build());
    }

    public ClientResponse callCreateMeetingApi(TrainingSession trainingSession, String accessToken) {
        WebClient webClient = getWebClient();
        String authorizationToken = "Bearer " + accessToken;
        String zoomCreateMeetingUrl = zoomDetails.createMeetingUrl;
        zoomCreateMeetingUrl = zoomCreateMeetingUrl.replace("{userId}", trainingSession.getUserId());
        ClientResponse clientResponse = webClient.post()
                .uri(zoomCreateMeetingUrl)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, authorizationToken)
                .body(Mono.just(trainingSession), TrainingSession.class)
                .exchange()
                .block();
        return clientResponse;
    }

    public ClientResponse callUpdateMeetingApi(TrainingSession session,String meetingId,String accessToken) {
        WebClient webClient = getWebClient();
        String authorizationToken = "Bearer " + accessToken;
        String zoomUrl = zoomDetails.updateMeetingUrl;
        zoomUrl = zoomUrl.replace("{meetingId}", meetingId);
        ClientResponse clientResponse = webClient.patch()
                .uri(zoomUrl)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, authorizationToken)
                .body(Mono.just(session), TrainingSession.class)
                .exchange()
                .block();

        return clientResponse;
    }

    public ClientResponse callDeleteMeetingApi(String meetingId,String accessToken) {
        WebClient webClient = getWebClient();

        String authorizationToken = "Bearer " + accessToken;

        String zoomUrl = zoomDetails.deleteMeetingUrl;
        zoomUrl = zoomUrl.replace("{meetingId}", meetingId);

        ClientResponse clientResponse = webClient.delete()
                .uri(zoomUrl)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, authorizationToken)
                .exchange()
                .block();

        return clientResponse;
    }

    public ClientResponse callGetMeetingApi(String meetingId,String accessToken) {
        WebClient webClient = getWebClient();

        String authorizationToken = "Bearer " + accessToken;

        String zoomUrl = zoomDetails.getMeetingDetailsUrl;
        zoomUrl = zoomUrl.replace("{meetingId}", meetingId);

        ClientResponse clientResponse = webClient.get()
                .uri(zoomUrl)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, authorizationToken)
                .exchange()
                .block();

        return clientResponse;
    }
}
