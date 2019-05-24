package edu.gatech.scheduler.payload;

public class AuthenticationSuccessResponse {
    private boolean isAuthenticated;
    private String token;

    // Constructor
    public AuthenticationSuccessResponse(boolean isAuthenticated, String token) {
        this.isAuthenticated = isAuthenticated;
        this.token = token;
    }

    public boolean isAuthenticated() {
        return isAuthenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        isAuthenticated = authenticated;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
