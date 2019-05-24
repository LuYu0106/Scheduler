package edu.gatech.scheduler.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class GroupnameAlreadyExistsException extends RuntimeException{
    public GroupnameAlreadyExistsException(String message) {
        super(message);
    }
}
