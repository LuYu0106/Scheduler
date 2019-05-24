package edu.gatech.scheduler.exceptions;

public class UsernameExistsResponse {
    private String username;

    public UsernameExistsResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

