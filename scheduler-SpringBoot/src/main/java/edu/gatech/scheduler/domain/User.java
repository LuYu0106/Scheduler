package edu.gatech.scheduler.domain;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import javax.validation.constraints.NotBlank;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.*;

@Document
public class User implements UserDetails {
    @Id
    private String id;

    // First Login Page (firstName, middleName, lastName, emailAddress & gender)
    @NotBlank(message="First Name is required")
    private String firstName;

    private String middleName;

    @NotBlank(message="Last Name is required")
    private String lastName;

    @NotBlank(message="Email address is required")
    private String emailAddress;

    @NotBlank(message="Gender is required")
    private String gender;

    @NotBlank(message="Birthday is required")
    private String birthday;

    @NotBlank(message="Highest Education is required")
    private String highestEducation;

    @NotBlank(message="Industry is required")
    private String industry;

    @NotBlank(message="Username is required")
    // Make sure the username is unique.
    @Indexed(unique = true)
    private String username;

    @NotBlank(message="Password is required")
    private String password;

    private Set<Integer> groupid;

    private Set<String> taskid;

    public User(String id, @NotBlank(message = "First Name is required") String firstName, String middleName,
                @NotBlank(message = "Last Name is required") String lastName,
                @NotBlank(message = "Email address is required") String emailAddress,
                @NotBlank(message = "Gender is required") String gender,
                @NotBlank(message = "Birthday is required") String birthday,
                @NotBlank(message = "Highest Education is required") String highestEducation,
                @NotBlank(message = "Industry is required") String industry,
                @NotBlank(message = "Username is required") String username,
                @NotBlank(message = "Password is required") String password, String passwordConfirm) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.gender = gender;
        this.birthday = birthday;
        this.highestEducation = highestEducation;
        this.industry = industry;
        this.username = username;
        this.password = password;
        this.groupid = new HashSet<>();
        this.taskid = new HashSet<>();
    }

    // Constructors
    public User(){
    }

    public String getId() {
        return id;

    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getHighestEducation() {
        return highestEducation;
    }

    public void setHighestEducation(String highestEducation) {
        this.highestEducation = highestEducation;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Set<Integer> getGroupid() {
        return groupid;
    }

    public void setGroupid(Set<Integer> groupid) {
        this.groupid = groupid;
    }

    public Set<String> getTaskid() {
        return taskid;
    }

    public void setTaskid(Set<String> taskid) {
        this.taskid = taskid;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
