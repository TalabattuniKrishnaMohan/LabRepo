package com.lab;

import java.util.List;

import org.springframework.beans.BeansException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import com.lab.controller.LabControllerImpl;
import com.lab.dao.StatesDao;
import com.lab.repository.StatesRepository;

@SpringBootApplication
public class LabApplication implements ApplicationContextAware {
	private static ApplicationContext applicationContext;

	public static void main(String[] args) {
		SpringApplication.run(LabApplication.class, args);
		LabControllerImpl.setFindAll((List<StatesDao>)applicationContext.getBean(StatesRepository.class).findAll());
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		LabApplication.applicationContext = applicationContext;
		
	}

}
