package edu.gatech.scheduler.service;

import edu.gatech.scheduler.domain.Task;
import edu.gatech.scheduler.repository.TaskRepository;
import edu.gatech.scheduler.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    TaskRepository taskRepository;


    public Task saveTask(Task task, String name) {
        String id = userRepository.findByUsername(name).getId();
        if (task.getIsInGroup().equals(-1)){
            // personal task
            if (task.getCreateByUserId()==null){
                // save a new task
                task.setCreateByUserId(id);
                task.setCompleteByUserId(id);
            }
        }else{
            if (task.getCreateByUserId() == null && task.getCompleteByUserId() == null){
                // save a new task
                task.setCreateByUserId(id);
            }else if (task.getCreateByUserId() != null && task.getCompleteByUserId() == null){
                // save a new task
                task.setCompleteByUserId(id);
            }
        }

        Task savetask = taskRepository.save(task);

        return savetask;
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public void deletebyTaskId(String taskId) {
        Task task = taskRepository.findById(new ObjectId(taskId));
        taskRepository.delete(task);
    }


    public List<Task> gelAllTasksByGroup(Integer groupId) {
        return taskRepository.findAllByIsInGroup(groupId);
    }

    public List<Task> gelAllTasksByUserInGroup(String username, Integer groupId) {
        ArrayList<Task> tasksByUserInGroup = new ArrayList<Task>();
        List<Task> groupTask = gelAllTasksByGroup(groupId);
        String userID = userRepository.findByUsername(username).getId();
        for (int i = 0; i<groupTask.size(); i++){ //check if each task is in some group
            Task task = groupTask.get(i);
            //System.out.println("yanqun: " + task.getIsInGroup());
            //System.out.println(task);
            if (task.getCompleteByUserId() != null && task.getCompleteByUserId().equals(userID) ){
                tasksByUserInGroup.add(task);
            }
        }
        return tasksByUserInGroup;
    }

    public List<Task> gelAllPrivateTasksByUserName(String username) {
        // find all tasks created by this person and not in a group
        System.out.println("GETTING PRIVATE TASK ");
        String userID = userRepository.findByUsername(username).getId();
        List<Task> tasks = taskRepository.findAllByCreateByUserId(userID);
        List<Task> tasksByPerson = new ArrayList<Task>();
        for (int i = 0; i<tasks.size(); i++){ //check if each task is in some group
            Task task = tasks.get(i);
            if (task.getIsInGroup().equals(-1) ){
                tasksByPerson.add(task);
            }
        }

        return tasksByPerson;
    }


    public List<Task> gelAllGroupTaskByUserID(String userID) {
        List<Task> completedTasksByUser = taskRepository.findAllByCompleteByUserId(userID);
        List<Task> privateTasks = new ArrayList<Task>();
        for (int i = 0; i<completedTasksByUser.size(); i++){
            Task task = completedTasksByUser.get(i);
            if (!task.getIsInGroup().equals(-1) ){
                privateTasks.add(task);
            }
        }
        return privateTasks;
    }

    public List<Integer> gelAllGroupIDsByUserID(String userID) {
        List<Task> completedTasksByUser = taskRepository.findAllByCompleteByUserId(userID);
        List<Integer> groupIDs = new ArrayList<>();
        for (int i = 0; i<completedTasksByUser.size(); i++){
            Task task = completedTasksByUser.get(i);
            if (!task.getIsInGroup().equals(-1) && groupIDs.indexOf(task.getIsInGroup()) == -1){
                groupIDs.add(task.getIsInGroup());
            }
        }
        return groupIDs;
    }

    public List<Task> gelAllGroupTasks(String userID) {
        List<Task> completedTasksByUser = taskRepository.findAllByCompleteByUserId(userID);
        List<Task> groupTasks = new ArrayList<Task>();

        for (int i = 0; i<completedTasksByUser.size(); i++){
            Task task = completedTasksByUser.get(i);

            if (!task.getIsInGroup().equals(-1 )){

                groupTasks.add(task);
            }
        }
        return groupTasks;
    }

    public int[] getStatByUser(String username) {
        int[] res = new int[]{0, 0};
        System.out.println("yanqun is getStatByUser SERVICE" );
        //String userID = userRepository.findByUsername(username).getId();
       // System.out.println(userID );
        List<Task> tasks = gelAllPrivateTasksByUserName( username);
        System.out.println(tasks );
        if (tasks.size() >0 ){
            for (int i = 0; i<tasks.size(); i++){
                Task task = tasks.get(i);
                if (task.isCompleted() == true){
                    res[0] ++;
                    //groupTasks.add(task);
                }else{
                    res[1] ++;
                }
            }
        }

        System.out.println("yanqun is getStatByUser SERVICE" );
        return res;
    }

    public int[] getStatByGroup(Integer groupId) {
        List<Task> tasks = gelAllTasksByGroup( groupId);
        int[] res = new int[]{0, 0};
        if (tasks.size() >0 ){
            for (int i = 0; i<tasks.size(); i++){
                Task task = tasks.get(i);
                if (task.isCompleted() == true){
                    res[0] ++;
                    //groupTasks.add(task);
                }else{
                    res[1] ++;
                }
            }
        }

        System.out.println("yanqun is getStatByGroup SERVICE" );
        return res;
    }


}
