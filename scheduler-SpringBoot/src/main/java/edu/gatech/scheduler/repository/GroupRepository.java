package edu.gatech.scheduler.repository;

import edu.gatech.scheduler.domain.Group;
import edu.gatech.scheduler.domain.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface GroupRepository extends MongoRepository<Group, String> {
    public List<Group> findAll();

    public Group findById(Integer id);

    public Group findByGroupName(String groupName);

    public List<Group> findByUserId(String userId);
}