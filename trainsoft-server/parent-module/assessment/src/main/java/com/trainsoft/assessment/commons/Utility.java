package com.trainsoft.assessment.commons;

import javax.servlet.http.HttpServletRequest;

public class Utility {
    public static String getSiteURL(HttpServletRequest request) {
/*        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");*/
        String siteURL ="https://www.trainsoft.io";
        return siteURL;
    }
}
