package edu.gatech.scheduler.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import edu.gatech.scheduler.domain.User;
import org.bson.types.ObjectId;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class ImplUserDetailsService implements UserDetailsService{
    @Autowired
    private UserService userService;

    // If we can't find the user, throw UsernameNotFoundException.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Search the database by using username
        User user = userService.findUserByUsername(username);

        if (user == null) {
            new UsernameNotFoundException("Username not found");
        }

        return user;
    }

    @Transactional
    public User loadUserById(String id){
        User user = userService.findUserByUserId(id);

        if (user == null) {
            throw new UsernameNotFoundException("Username not found");
        }

        return user;
    }
}