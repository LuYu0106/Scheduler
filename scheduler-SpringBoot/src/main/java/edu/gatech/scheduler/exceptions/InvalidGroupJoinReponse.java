package edu.gatech.scheduler.exceptions;

public class InvalidGroupJoinReponse {
    private String groupName;

    public InvalidGroupJoinReponse(String groupName) {
        this.groupName = "invalid group name or password";

    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }


}
