package com.lab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.lab.dao.StatesDao;

public interface StatesRepository extends CrudRepository<StatesDao, Long> {

	@Query(value = "SELECT DISTINCT `states_names` FROM state_names_table ", nativeQuery = true)
	List<String> findStatesNames();

}
