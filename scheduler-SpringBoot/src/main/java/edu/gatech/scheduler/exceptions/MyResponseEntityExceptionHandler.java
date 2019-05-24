package edu.gatech.scheduler.exceptions;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@ControllerAdvice
@RestController
public class MyResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameAlreadyExists(UsernameExistsException exception,
                                                                    WebRequest request) {
        UsernameExistsResponse exceptionResponse = new UsernameExistsResponse(exception.getMessage());

        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleGroupnameAlreadyExistsException(GroupnameAlreadyExistsException exception,
                                                                              WebRequest request) {
        GroupnameAlreadyExistsResponse exceptionResponse = new GroupnameAlreadyExistsResponse(exception.getMessage());

        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleInvalidJoinGroupRequest(InvalidGroupJoinException exception,
                                                                      WebRequest request) {
        InvalidGroupJoinReponse exceptionResponse = new InvalidGroupJoinReponse(exception.getMessage());

        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}