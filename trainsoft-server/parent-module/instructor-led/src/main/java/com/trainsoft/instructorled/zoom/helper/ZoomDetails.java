package com.trainsoft.instructorled.zoom.helper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ZoomDetails {
    String zoomHostAPIUrl = "https://api.zoom.us";
    String zoomUrl = "https://zoom.us";

    String accessTokenUrlFromOAuth = zoomUrl + "/oauth/token?grant_type=authorization_code&code={oAuthCode}&redirect_uri={redirectUrl}";
    String userZoomDetailsUrl = zoomHostAPIUrl + "/v2/users/me";
    String createMeetingUrl = zoomHostAPIUrl + "/v2/users/{userId}/meetings";
    //String updateMeetingUrl = zoomHostAPIUrl + "/v2/meetings/{meetingId}?occurrence_id=agenda%2Cstart_time%2Cduration";
    String deleteMeetingUrl = zoomHostAPIUrl + "/v2/meetings/{meetingId}";
    String getMeetingDetailsUrl = zoomHostAPIUrl + "/v2/meetings/{meetingId}";
    String updateMeetingUrl = zoomHostAPIUrl + "/v2/meetings/{meetingId}";
}
