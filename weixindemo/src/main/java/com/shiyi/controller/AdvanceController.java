package com.shiyi.controller;

import com.shiyi.pojo.Advance;
import com.shiyi.service.AdvanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class AdvanceController {

    @Autowired
    private AdvanceService advanceService;

    @PostMapping("/saveAdvance")
    public ResponseEntity<Void> saveAdvance(@RequestBody Advance advace){
        advanceService.saveAdvance(advace);
        return ResponseEntity.ok().build();
    }

}
