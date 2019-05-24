package edu.gatech.scheduler.repository;

import edu.gatech.scheduler.domain.Task;
import edu.gatech.scheduler.domain.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    public List<Task> findAll();

    public Task findById(ObjectId id);

    public ArrayList<Task> findAllByCreateByUserId(String createByUserId);

    public List<Task> findAllByCompleteByUserId(String completeByUserId);

    public List<Task> findAllByIsInGroup(Integer isInGroup);

    public Task save(Task task);
}