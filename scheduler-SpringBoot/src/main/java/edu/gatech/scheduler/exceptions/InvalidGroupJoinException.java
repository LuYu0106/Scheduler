package edu.gatech.scheduler.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidGroupJoinException extends RuntimeException{

    public InvalidGroupJoinException(String message) {
        super(message);
    }

}
