package com.example.kanban.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kanban.dto.user.UpdateProfileRequestDto;
import com.example.kanban.dto.user.UserResponseDto;
import com.example.kanban.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	
	@GetMapping
	public ResponseEntity<UserResponseDto> getProfile(){
		return ResponseEntity.ok(userService.getProfile());
	}
	
	@PutMapping("/")
	public ResponseEntity<UserResponseDto> updateProfile(UpdateProfileRequestDto updateProfileRequestDto){
		return ResponseEntity.ok(userService.updateProfile(updateProfileRequestDto));
	}
//
//	PUT /api/users/change-password
	
}
