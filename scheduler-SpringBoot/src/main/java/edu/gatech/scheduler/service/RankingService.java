package edu.gatech.scheduler.service;

import edu.gatech.scheduler.domain.Task;
import edu.gatech.scheduler.domain.User;
import edu.gatech.scheduler.repository.TaskRepository;
import edu.gatech.scheduler.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RankingService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    TaskRepository taskRepository;


    public List<String[]> getTop3() {
        Map<String, Integer> taskcounter = new HashMap<>();
        List<Task> tasks = taskRepository.findAll();
        for (Task s : tasks) {
            if (s.isCompleted()) {
                taskcounter.put(s.getCompleteByUserId(), taskcounter.getOrDefault(s.getCompleteByUserId(), 0) + 1);
            }
        }

        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>((a, b) -> b.getValue() - a.getValue());

        for (Map.Entry<String, Integer> e : taskcounter.entrySet()) {
            pq.offer(e);
        }
        List<String[]> res = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            if (!pq.isEmpty()) {
                Map.Entry<String, Integer> e = pq.poll();
                String ID = e.getKey();
                User user = userRepository.getById(ID);
                res.add(new String[] {user.getUsername() , String.valueOf(e.getValue())});
            }
        }
        return res;

      /*  List<User> users = getAllUsers();
        List<User> res  = new ArrayList<>();
        for (int i = 0 ;i < 3 ; i++) {
            res.add(users.get(i));
        }
        return res;
        */
    }

}
