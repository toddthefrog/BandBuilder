package com.skilldistillery.bandbuilder.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.bandbuilder.datatransferobjects.RegistrationDTO;
import com.skilldistillery.bandbuilder.entities.Profile;
import com.skilldistillery.bandbuilder.services.ProfileService;

@RestController
@RequestMapping("api")
//@CrossOrigin({ "*", "http://localhost:4200" })
public class ProfileController {

	@Autowired
	private ProfileService profileSvc;
	
	@GetMapping("profiles")
	public List<Profile> getAllProfiles() {
		return profileSvc.getAllProfiles();
	}
	
	@GetMapping("profiles/{pid}")
	public Profile getProfileById(@PathVariable("pid") Integer id,
			HttpServletResponse resp) {
		
		Profile profile = profileSvc.getProfileById(id);
		
		if (profile == null) {
			resp.setStatus(404);
		}
		
		return profile;
	}
	
	@PostMapping("profiles")
	public Profile createProfile(@RequestBody RegistrationDTO regInfo,
			HttpServletResponse resp,
			HttpServletRequest req) {
		
		Profile profile = profileSvc.createProfile(regInfo);
		
		if (profile != null) {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/");
			url.append(profile.getId());
			resp.setHeader("Location", url.toString());
		} else {
			resp.setStatus(400);
		}
		
		return profile;
	}
	
	@PutMapping("profiles/{pid}")
	public Profile updateProfile(@RequestBody Profile updatedProfile, @PathVariable("pid") Integer id,
			HttpServletResponse resp) {
		
		profileSvc.updateProfileById(id, updatedProfile);
		
		if (updatedProfile != null) {
			resp.setStatus(201);
		} else {
			resp.setStatus(400);
		}
		
		return updatedProfile;
	}
	
	@DeleteMapping("profiles/{pid}")
	public void deleteProfile(@PathVariable("pid") Integer id,
			HttpServletResponse resp) {
		
		if (profileSvc.deleteProfileById(id)) {
			resp.setStatus(204);
		} else {
			resp.setStatus(400);
		}		
	}
}
