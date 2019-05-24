package edu.gatech.scheduler.entity;

import javax.validation.constraints.NotBlank;

public class JoinGroupRequest {
        @NotBlank(message="groupName is required")
        private String groupName;
        @NotBlank(message="groupPassword is required")
        private String groupPassword;


    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupPassword() {
        return groupPassword;
    }

    public void setGroupPassword(String groupPassword) {
        this.groupPassword = groupPassword;
    }
}
