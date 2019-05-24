package edu.gatech.scheduler.service;

import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;

import org.springframework.http.HttpStatus;

@Service
public class ValidationService {
    public ResponseEntity<?> validate(BindingResult result) {
        // if no error
        if (!result.hasErrors()) {
            return null;
        }

        HashMap<String, String> errors = new HashMap<>();

        // Iterate the result， get each error message and put its information to errors.
        for (FieldError error : result.getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}

