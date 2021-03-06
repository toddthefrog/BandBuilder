package com.skilldistillery.bandbuilder.entitytests;

import static org.junit.jupiter.api.Assertions.*;


import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.skilldistillery.bandbuilder.entities.Address;
@DisplayName("Address Entity Test")
class AddressTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Address address;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("bandJPA");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		address = em.find(Address.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		address = null;
		em.close();
	}

	@Test
	void test_address_mapping() {
		assertEquals(1, address.getId());
		assertEquals("123 Colorado Drive ", address.getStreet());
		assertEquals("Denver", address.getCity());
		assertEquals("Colorado", address.getState());
		assertEquals("80220", address.getZip());
		assertEquals("7201234567", address.getPhone());

		String pattern = "yyyy-MM-dd";
		String pattern2 = "HH:mm:ss";
		java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(pattern);
		java.text.SimpleDateFormat sdf2 = new java.text.SimpleDateFormat(pattern2);

		assertEquals("2019-04-01 23:08:48",
				sdf.format(address.getCreatedAt()) + " " + sdf2.format(address.getCreatedAt()));
		assertEquals("2019-04-01 23:08:48",
				sdf.format(address.getUpdatedAt()) + " " + sdf2.format(address.getUpdatedAt()));

	}

}
