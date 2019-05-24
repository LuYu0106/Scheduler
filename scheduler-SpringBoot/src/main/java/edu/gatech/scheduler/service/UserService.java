package edu.gatech.scheduler.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import edu.gatech.scheduler.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import edu.gatech.scheduler.domain.User;
import edu.gatech.scheduler.exceptions.UsernameExistsException;
import org.bson.types.ObjectId;
import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Save new user
    public User saveNewUser(User user) {
        try {
            /* Use passwordEncoder to encode the given password by the user
               and set the encoded password to user's password.
             */
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Set the username given by the user to user's username.
            user.setUsername(user.getUsername());

            return userRepository.save(user);
        } catch (Exception exception) {
            // If the username has been used, throw an exception.
            throw new UsernameExistsException("Username already exits");
        }
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findUserByUserId(String id) {
        return userRepository.getById(id);
    }

    // Find User by username
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
