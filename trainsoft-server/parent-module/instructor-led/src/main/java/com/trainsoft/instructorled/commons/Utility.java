package com.trainsoft.instructorled.commons;

import javax.servlet.http.HttpServletRequest;

public class Utility {
    public static String getSiteURL(HttpServletRequest request) {
/*        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");*/
        String siteURL = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        return siteURL;
    }
}
