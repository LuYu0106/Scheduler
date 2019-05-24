package edu.gatech.scheduler.domain;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.net.URL;

import java.util.*;


@Document
public class Group {

    @Id
    private Integer id;

    @NotBlank(message="Group name is required")
    private String groupName;

    @NotBlank(message="Group password is required")
    private String groupPassword;
    private String userId;
    private Set<String> groupMemberIds;
    private String groupPic;

    @NotBlank(message="Group Description is required")
    @Size(min = 10, max = 30)
    private String groupDescription;

    public Group() {

    }

    public Group(Integer id, @NotBlank(message = "Group name is required") String groupName, @NotBlank(message = "Group password is required") String groupPassword, String userId, Set<String> groupMemberIds, String groupPic, @NotBlank(message = "Group Description is required") String groupDescription) {
        this.id = id;
        this.groupName = groupName;
        this.groupPassword = groupPassword;
        this.userId = userId;
        this.groupMemberIds = new HashSet<>();
        this.groupPic = groupPic;
        this.groupDescription = groupDescription;
    }


    public void setUserId(String userId) {
        this.userId = userId;
    }


    public String getUserId() {
        return userId;
    }

    public Set<String> getGroupMemberIds() {
        return groupMemberIds;
    }

    public void setGroupMemberIds(Set<String> groupMemberIds) {
        this.groupMemberIds = groupMemberIds;
    }

    public String getGroupPic() {
        return groupPic;
    }

    public void setGroupPic(String groupPic) {
        this.groupPic = groupPic;
    }

    public String getGroupDescription() {
        return groupDescription;
    }

    public void setGroupDescription(String groupDescription) {
        this.groupDescription = groupDescription;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Group(String groupName) {
        this.groupName = groupName;
    }

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

    @Override
    public String toString() {
        return "Group{" +
                "id=" + id +
                ", groupName='" + groupName + '\'' +
                ", groupPassword='" + groupPassword + '\'' +
                ", userId='" + userId + '\'' +
                ", groupMemberIds=" + groupMemberIds +
                ", groupPic='" + groupPic + '\'' +
                ", groupDescription='" + groupDescription + '\'' +
                '}';
    }
}