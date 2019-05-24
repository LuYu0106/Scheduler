package edu.gatech.scheduler;

import edu.gatech.scheduler.domain.Group;
import edu.gatech.scheduler.domain.User;
import edu.gatech.scheduler.repository.GroupRepository;
import edu.gatech.scheduler.repository.UserRepository;
import edu.gatech.scheduler.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;

@SpringBootApplication
public class SchedulerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SchedulerApplication.class, args);
        System.out.println("yanqun is getting all tasks " );
    }

}
