package edu.gatech.scheduler.exceptions;

public class GroupnameAlreadyExistsResponse {
    private String groupName;

    public GroupnameAlreadyExistsResponse (String groupName) {
        this.groupName = groupName;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
}
