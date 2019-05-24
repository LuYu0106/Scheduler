package edu.gatech.scheduler.controller;


import edu.gatech.scheduler.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/ranking")
public class RankingController {

    @Autowired
    private RankingService rankingService;

    @Autowired
    private TreeService treeService;


    @GetMapping("")
    public ResponseEntity<?> getTop() {
        List<String[]> userListTop = rankingService.getTop3();

        return new ResponseEntity< List<String[]>>(userListTop, HttpStatus.OK);
    }

    @GetMapping("/ml")
    public ResponseEntity<?> getRecommendation(Principal principal) throws Exception {
        List<String[]> recommendation  = treeService.getRecommendation(principal.getName());
        return new ResponseEntity< List<String[]>>(recommendation, HttpStatus.OK);
    }
}
