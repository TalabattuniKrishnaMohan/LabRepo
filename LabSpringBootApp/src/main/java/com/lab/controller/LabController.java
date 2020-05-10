package com.lab.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lab.dao.StatesCities;

@RestController
public interface LabController {
	
	@GetMapping("/getAllCitiesData")
	ResponseEntity<StatesCities> getAllCitiesData(HttpServletRequest req);
}
