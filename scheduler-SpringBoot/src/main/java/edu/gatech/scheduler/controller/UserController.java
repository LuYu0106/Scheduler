package edu.gatech.scheduler.controller;

import org.springframework.beans.factory.annotation.Autowired;
import edu.gatech.scheduler.domain.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;
import org.springframework.security.core.Authentication;
import edu.gatech.scheduler.payload.LoginRequest;
import edu.gatech.scheduler.service.UserService;
import edu.gatech.scheduler.config.JWTProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import edu.gatech.scheduler.payload.AuthenticationSuccessResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.FieldError;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTProvider jwtProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("")
    public List<User> gelAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/id/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId){

        User user = userService.findUserByUserId(userId);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username){

        User user = userService.findUserByUsername(username);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user, BindingResult result){
        // If no error message
        if (!result.hasErrors()) {
            User newUser = userService.saveNewUser(user);

            return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
        }

        // If there are error messages
        HashMap<String, String> errors = new HashMap<>();

        for(FieldError error: result.getFieldErrors()){
            errors.put(error.getField(), error.getDefaultMessage());
        }

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        if (!result.hasErrors()) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            // Get the token from "Bearer " and Json Web Token (JWT).
            String token = "Bearer " + jwtProvider.generateJWT(authentication);

            AuthenticationSuccessResponse authenticationSuccessResponse =
                    new AuthenticationSuccessResponse(true, token);

            return ResponseEntity.ok(authenticationSuccessResponse);
        }

        HashMap<String, String> errors = new HashMap<>();

        for(FieldError error: result.getFieldErrors()){
            errors.put(error.getField(), error.getDefaultMessage());
        }

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
