package com.lab.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.lab.dao.StatesCities;

@Service
@FunctionalInterface
public interface LabService {
	StatesCities getAllCitiesData(HttpServletRequest req);
}
