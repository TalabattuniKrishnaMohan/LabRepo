package com.lab.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.lab.dao.CitiesDao;
import com.lab.dao.StatesCities;
import com.lab.dao.StatesDao;
import com.lab.service.LabService;

@RestController
public class LabControllerImpl implements LabController {

	private static List<StatesDao> findAll;

	public static List<StatesDao> getFindAll() {
		return findAll;
	}

	public static void setFindAll(List<StatesDao> findAll) {
		LabControllerImpl.findAll = findAll;
	}

	LabService calc = (labService) -> {

		List<String> statesLst = new ArrayList<>();
		List<CitiesDao> citiesDaoLst = new ArrayList<>();

		String district = labService.getHeader("district");
		String state = labService.getHeader("states");

		StatesCities statesCities = new StatesCities();
		if (null != district && !district.equals("")) {
			getFindAll().forEach(entry -> {
				entry.getDistrictDaos().forEach(districEntry -> {
					if (districEntry.getDistrictNames().equals(district)) {
						citiesDaoLst.addAll(districEntry.getCitiesDao());
					}
				});

			});
			statesCities.setCitiesDao(citiesDaoLst);

		} else if (null != state && !state.equals("")) {
			getFindAll().forEach(entry -> {
				entry.getDistrictDaos().forEach(n -> {
					if (entry.getStateNames().equals(state)) {
						statesLst.add(n.getDistrictNames());
					}
				});
			});
			statesCities.setStates(statesLst);
		} else {
			getFindAll().forEach(entry -> {
				statesLst.add(entry.getStateNames());
				entry.getDistrictDaos().forEach(n -> citiesDaoLst.addAll(n.getCitiesDao()));
			});
			statesCities.setStates(
					statesLst.stream().filter((p) -> null != p && !p.equals("")).collect(Collectors.toList()));
			statesCities.setCitiesDao(citiesDaoLst);
		}
		return statesCities;
	};

	public ResponseEntity<StatesCities> getAllCitiesData(HttpServletRequest req) {
		return new ResponseEntity<>(calc.getAllCitiesData(req), HttpStatus.CREATED);
	}

}
