package com.lab.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;




@Entity
@Table(name = "cities_names_table")
@Setter
@Getter
@NoArgsConstructor
@ToString
public class CitiesDao implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "city_id")
	private Long cityId;

	@Column(name = "city_names")
	private String cityNames;

	@Column(name = "rto_code")
	private String rtoCode;

	@Column(name = "population")
	private String population;

	@Column(name = "village_count")
	private Integer villageCount;

	@Column(name = "district_names")
	private String districtNames;

}
