package edu.gatech.scheduler.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import edu.gatech.scheduler.domain.Group;
import edu.gatech.scheduler.domain.Task;
import edu.gatech.scheduler.domain.User;
import org.bson.types.ObjectId;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public List<User> findAll();

    public User getById(String id);

    public User findByUsername(String username);

    User save(User user);
}