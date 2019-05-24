package edu.gatech.scheduler.service;

import edu.gatech.scheduler.domain.Group;
import edu.gatech.scheduler.domain.Sequence;
import edu.gatech.scheduler.domain.User;
import edu.gatech.scheduler.entity.JoinGroupRequest;
import edu.gatech.scheduler.exceptions.GroupnameAlreadyExistsException;
import edu.gatech.scheduler.exceptions.InvalidGroupJoinException;
import edu.gatech.scheduler.repository.GroupRepository;
import edu.gatech.scheduler.repository.SequenceRepository;
import edu.gatech.scheduler.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    SequenceRepository sequenceRepository;

    // also doing update group info here
    public Group saveNewGroup(Group group, String userName) {
        String gname = group.getGroupName();
        if (findGroupbyGroupName(gname) != null) {
            if (group.getId() == null) {
                throw new GroupnameAlreadyExistsException("Groupname " + gname.toUpperCase() + " already exist");
            }
        }

        if (group.getId() == null) {
            Integer number = getNewGroupId();
            group.setId(number);
        }
        User user = userRepository.findByUsername(userName);

        if (user.getGroupid() == null) {
            Set<Integer> groupId = new HashSet<>();
            user.setGroupid(groupId);
        }
        user.getGroupid().add(group.getId());
        // this is really important save the user!!!
        userRepository.save(user);

        return groupRepository.save(group);
    }

    public Group JoinNewGroup(JoinGroupRequest joinGroupRequest, String userName) {
        String groupname = joinGroupRequest.getGroupName();
       // System.out.println(groupname);
        //System.out.println(joinGroupRequest.getGroupPassword());
        Group group = findGroupbyGroupName(groupname);
        String pass = joinGroupRequest.getGroupPassword();
        if (group == null || !group.getGroupPassword().equals(pass)) {
            throw new InvalidGroupJoinException("Invalid group name or password");
        }
        Integer groupId = group.getId();
        //System.out.println(groupId);
        User user = userRepository.findByUsername(userName);

        if (user.getGroupid() == null) {
            Set<Integer> groups = new HashSet<>();
            user.setGroupid(groups);
        }
        user.getGroupid().add(groupId);
        userRepository.save(user);

        return group;
    }

    private Group findGroupbyGroupName(String groupName) {
        return groupRepository.findByGroupName(groupName);
    }

    public Set<Group> findAllGroups(String userName) {
        User user = userRepository.findByUsername(userName);
        Set<Integer> groupIDs = user.getGroupid();
        Set<Group> res = new HashSet<>();
        if (groupIDs != null) {
            for (Integer g : groupIDs) {
                Group cur = groupRepository.findById(g);
                res.add(cur);
            }
        }
        return res;
    }



    public Integer getNewGroupId() {
        Sequence s = sequenceRepository.findByclassName("Group");
        if (s == null) {
            sequenceRepository.save(new Sequence("Group", 0));
            return new Integer(0);
        } else {
            Integer number = s.getLastId();
            Integer update = number + 1;
            s.setLastId(update);
            sequenceRepository.save(s);
            return update;
        }
    }

    public void deletebyGroupId(Integer GroupId) {
        Group g = groupRepository.findById(GroupId);
        if (g != null) {
            groupRepository.delete(g);
        }
    }

    public Iterable<Group> findAllGroups() {
        return groupRepository.findAll();
    }

    public Group findByGroupId(Integer id) {
        return groupRepository.findById(id);
    }
}



