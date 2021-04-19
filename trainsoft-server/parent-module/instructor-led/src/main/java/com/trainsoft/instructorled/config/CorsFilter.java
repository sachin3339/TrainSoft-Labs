package com.trainsoft.instructorled.config;

import com.trainsoft.instructorled.customexception.ResourceNotFoundException;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        try {
            HttpServletResponse response = CorsConfig.addResponseHeaders(res);
            chain.doFilter(req, response);
        } catch (Exception ex) {
            throw new ResourceNotFoundException("Failed to get the response.");
        }
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }
}
