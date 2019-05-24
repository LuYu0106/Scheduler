package edu.gatech.scheduler.controller;


import edu.gatech.scheduler.domain.Group;
import edu.gatech.scheduler.entity.JoinGroupRequest;
import edu.gatech.scheduler.exceptions.GroupnameAlreadyExistsException;
import edu.gatech.scheduler.exceptions.InvalidGroupJoinException;
import edu.gatech.scheduler.service.GroupService;
import edu.gatech.scheduler.service.ValidationService;
import edu.gatech.scheduler.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@CrossOrigin
@RestController
@RequestMapping("/api/group")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @Autowired
    private UserService userService;

    @Autowired
    private ValidationService validationService;


    @GetMapping("")
    public ResponseEntity<?> gelAllGroups( Principal principal) {
        Set<Group> groups =  groupService.findAllGroups(principal.getName());
        return new ResponseEntity<Set<Group>>(groups, HttpStatus.OK);
    }

    @GetMapping("/{groupId}")
    public Group getGroupbyId(@PathVariable Integer groupId) {
        return groupService.findByGroupId(groupId);
    }

    @PostMapping("")
    public ResponseEntity<?> createNewGroup(@Valid @RequestBody Group group, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = validationService.validate(result);
        if (errorMap != null) {
            return errorMap;
        }

        // create, get the cur user username and cur groupd id. add the gid into user.groupid set.
        Group group1 = groupService.saveNewGroup(group, principal.getName());
        return new ResponseEntity<Group>(group1, HttpStatus.CREATED);
    }

    @PostMapping("/joinNewGroup")
    public ResponseEntity<?> JoinNewGroup(@Valid @RequestBody JoinGroupRequest joinGroupRequest, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = validationService.validate(result);
        if (errorMap != null) {
            return errorMap;
        }
        Group group = groupService.JoinNewGroup(joinGroupRequest, principal.getName());
        return new ResponseEntity<Group>(group, HttpStatus.CREATED);
    }
}
