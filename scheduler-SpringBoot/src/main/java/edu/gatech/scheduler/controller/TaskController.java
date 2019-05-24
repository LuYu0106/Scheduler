
package edu.gatech.scheduler.controller;

import edu.gatech.scheduler.domain.Task;
import edu.gatech.scheduler.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @DeleteMapping("/id/{taskId}")
    public void deleteProject(@PathVariable String taskId) {
       // System.out.println("the taskId is " + taskId);
        taskService.deletebyTaskId(taskId);

    }

    @GetMapping("/personalTask")
    public ResponseEntity<?> gelAllTasksByPrivateSessionName(Principal principal){
        //System.out.println("the userID is " + userID);
        List<Task> tasks =  taskService.gelAllPrivateTasksByUserName(principal.getName());
//        for (Task task : tasks){
//            System.out.println("the taskId is " + task);
//        }
        return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);

    }

    @GetMapping("/groupTask/{userID}")
    public List<Task> gelAllGroupTasks(@PathVariable String userID){
        return taskService.gelAllGroupTasks(userID);

    }

    @GetMapping("/groups/{userID}")
    public List<Integer> gelAllGroups(@PathVariable String userID){
        return taskService.gelAllGroupIDsByUserID(userID);

    }

    @GetMapping("/group/{GroupId}")
    public List<Task> getAllTasksByGroup(@PathVariable Integer GroupId){
        return taskService.gelAllTasksByGroup(GroupId);
    }

    @GetMapping("/selectedTasks")
    public List<Task> getAllTasksByUserAndGroup(@RequestParam Integer GroupId, Principal principal){

        return taskService.gelAllTasksByUserInGroup(principal.getName(), GroupId);
    }

    @GetMapping("/personalStat")
    public int[] getStatByUser(Principal principal){
        System.out.println("yanqun is getGroupStatByUser CONTROLLER" );
        return taskService.getStatByUser(principal.getName());
    }

    @GetMapping("/groupStat/{GroupId}")
    public int[] gelAllGroupStatByGroup(@PathVariable Integer GroupId){

        return taskService.getStatByGroup(GroupId);
    }


    @GetMapping("")
    public List<Task> gelAllTasks(){
        //System.out.println("yanqun is getting all tasks " );
        return taskService.findAll();
    }

    @PostMapping("/saveTask")
    public ResponseEntity<?> savePersonalTaskTask(@Valid @RequestBody Task task, Principal principal) {

//        System.out.println("before you save task" );
//        System.out.println(principal.getName());
//        System.out.println("task" );
//        System.out.println(task);
        Task task1 = taskService.saveTask(task, principal.getName());
//        System.out.println("after you save task" );
//        System.out.println("principal.getName() in save task" );
//        System.out.println(principal.getName());
//        System.out.println("task1" );
//        System.out.println(task1);
        return new ResponseEntity<Task>(task1, HttpStatus.OK);

    }

//    @PostMapping("/groupTask")
//    public ResponseEntity<?> saveGroupTask(@Valid @RequestBody Task task, Principal principal) {
//
//        Task task1 = taskService.saveTask(task, principal.getName());
//        return new ResponseEntity<Task>(task1, HttpStatus.OK);
//    }

}
