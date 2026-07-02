package com.example.kanban.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kanban.dto.AppUserResponseDto;
import com.example.kanban.service.AppUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appUser")
@RequiredArgsConstructor
public class AppUserController {

	private AppUserService appUserService;
	
	@PostMapping
	public AppUserResponseDto createUser() {
		appUserService.createUser(null);
		return null;
	}
	
	@GetMapping
	public AppUserResponseDto getAllAppUser() {
		return null;
	}
	
	@GetMapping
	public AppUserResponseDto getAppUserId() {
		return null;
	}
	@PutMapping
	public AppUserResponseDto updateAppUser() {
		return null;
	}
	
	@DeleteMapping
	public AppUserResponseDto deleteAppUser() {
		return null;
	}
}
