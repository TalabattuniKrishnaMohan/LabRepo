package com.lab.dao;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class StatesCities {
	
	List<String> states;
	List<CitiesDao> citiesDao;

}
