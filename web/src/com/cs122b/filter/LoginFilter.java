package com.cs122b.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonObject;

import java.io.IOException;
import java.util.ArrayList;

@WebFilter(filterName = "LoginFilter", urlPatterns = "/api/*")
public class LoginFilter implements Filter {
    private final ArrayList<String> allowedURIs = new ArrayList<String>();

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        if (this.isUrlAllowedWithoutLogin(httpRequest.getRequestURI())) {
            chain.doFilter(request, response);
            return;
        }

        // Redirect to login page if the "user" attribute doesn't exist in session
        if (httpRequest.getSession().getAttribute("user_id") == null) {
            httpResponse.setContentType("application/json");
            httpResponse.setCharacterEncoding("UTF-8");
            JsonObject responseJsonObject = new JsonObject();
            responseJsonObject.addProperty("status", "failure");
            responseJsonObject.addProperty("message", "must be logged in");
            httpResponse.setStatus(401);
            httpResponse.getWriter().write(responseJsonObject.toString());
        } else {
            chain.doFilter(request, response);
        }
    }

    private boolean isUrlAllowedWithoutLogin(String requestURI) {
        // DEV
        // return true;
        return allowedURIs.stream().anyMatch(requestURI.toLowerCase()::endsWith);
    }

    public void init(FilterConfig fConfig) {

        // Album
        allowedURIs.add("api/albums");
        allowedURIs.add("api/album");
        allowedURIs.add("api/albums/tracks");

        // Artist
        allowedURIs.add("api/artists");
        allowedURIs.add("api/artist");

        // Track
        allowedURIs.add("api/tracks");
        allowedURIs.add("api/track");
        allowedURIs.add("api/track/meta");

        // Playlist
        allowedURIs.add("api/playlists");
        // allowedURIs.add("api/playlist");
        allowedURIs.add("api/playlist/session");
        allowedURIs.add("api/playlist/session/track");
        allowedURIs.add("api/playlist/session/album");

        // Genres
        allowedURIs.add("api/genres");

        // User
        allowedURIs.add("api/user");

        // Employee
        allowedURIs.add("api/employee");

        // Auth
        allowedURIs.add("api/login");
        allowedURIs.add("api/logout");

        // Database
        allowedURIs.add("api/database/meta");
    }

    public void destroy() {
        // ignored.
    }
}