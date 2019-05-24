package edu.gatech.scheduler.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;


@Document
public class Task {
    @Id
    private String id;
    private String taskDDL;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTaskDDL() {
        return taskDDL;
    }

    public void setTaskDDL(String taskDDL) {
        this.taskDDL = taskDDL;
    }

    public String getCreateByUserId() {
        return createByUserId;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public String getCompleteByUserId() {
        return completeByUserId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public int getEstimatedHours() {
        return estimatedHours;
    }

    public void setEstimatedHours(int estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    private String createByUserId;
    private Integer isInGroup;
    private boolean isCompleted;
    private String completeByUserId; //username
    //private User completeByUser; //username
    private String description;
    private String website;
    private int estimatedHours;
    private String tag;

    public Task() {

    }

    public Task( String taskDDL, String createByUserId, Integer isInGroup, boolean isCompleted, String completeByUserId, String description, String website, int estimatedHours, String tag) {

        this.taskDDL = taskDDL;
        this.createByUserId = createByUserId;
        this.isInGroup = isInGroup;
        this.isCompleted = isCompleted;
        this.completeByUserId = completeByUserId;
        this.description = description;
        this.website = website;
        this.estimatedHours = estimatedHours;
        this.tag = tag;
    }

    public void setCreateByUserId(String createByUserId) {
        this.createByUserId = createByUserId;
    }

    public Integer getIsInGroup() {
        return isInGroup;
    }

    public void setIsInGroup(Integer isInGroup) {
        this.isInGroup = isInGroup;
    }

    public void setCompleteByUserId(String completeByUserId) {
        this.completeByUserId = completeByUserId;
    }
    //    public User getCompleteByUser() {
//        return this.completeByUser;
//    }
//
//    public void setCompleteByUser(User user) {
//
//        this.completeByUser = user;
//    }

    @Override
    public String toString() {
        return "the taskid is : " + this.id + "  +++++  " + "the completeByUserId is : " + this.completeByUserId + "  +++++  ";
    }


}
