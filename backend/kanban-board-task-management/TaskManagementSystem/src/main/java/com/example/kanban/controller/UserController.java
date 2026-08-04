package com.example.kanban.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kanban.dto.user.ChangePasswordRequestDto;
import com.example.kanban.dto.user.UpdateProfileRequestDto;
import com.example.kanban.dto.user.UserResponseDto;
import com.example.kanban.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "User Profile", description = "Manage authenticated user's profile")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	/**
	 * 
	 * @return
	 */
	@GetMapping("/profile-details")
	public ResponseEntity<UserResponseDto> getProfile() {
		return ResponseEntity.ok(userService.getProfile());
	}

	/**
	 * 
	 * @param updateProfileRequestDto
	 * @return
	 */
	@PutMapping("/update-profile")
	public ResponseEntity<UserResponseDto> updateProfile(UpdateProfileRequestDto updateProfileRequestDto) {
		return ResponseEntity.ok(userService.updateProfile(updateProfileRequestDto));
	}

	/**
	 * 
	 * @param passwordRequestDto
	 * @return
	 */
	@PutMapping("/change-password")
	public ResponseEntity<Void> changePassword(ChangePasswordRequestDto passwordRequestDto) {
		userService.changePassword(passwordRequestDto);
		return ResponseEntity.noContent().build();
	}

}
