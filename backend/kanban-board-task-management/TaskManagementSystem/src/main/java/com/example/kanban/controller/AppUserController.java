package com.example.kanban.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kanban.dto.AppUserRequestDto;
import com.example.kanban.dto.AppUserResponseDto;
import com.example.kanban.service.AppUserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appUser")
@RequiredArgsConstructor
public class AppUserController {

	private AppUserService appUserService;

	@PostMapping
	public ResponseEntity<AppUserResponseDto> createUser(@RequestBody AppUserRequestDto appUserRequestDto) {
		AppUserResponseDto appUserResponseDto = appUserService.createUser(appUserRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(appUserResponseDto);
	}

	@GetMapping
	public ResponseEntity<List<AppUserResponseDto>> getAllAppUser() {
		 List<AppUserResponseDto> appUserList=appUserService.getAllUsers();
		 return ResponseEntity.status(HttpStatus.OK).body(appUserList);
	}

	@GetMapping("/{id}")
	public ResponseEntity<AppUserResponseDto> getAppUserId(@PathVariable Long appUserId) {
		AppUserResponseDto appUserResponseDto = appUserService.getUserById(appUserId);
		return ResponseEntity.ok(appUserResponseDto);
	}

	@PutMapping("/{id}")
	public ResponseEntity<AppUserResponseDto> updateAppUser(@PathVariable Long appUserId, @Valid @RequestBody AppUserRequestDto appUserRequestDto) {
		AppUserResponseDto appUserResponseDto = appUserService.updateUser(appUserId, appUserRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(appUserResponseDto);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<AppUserResponseDto> deleteAppUser(@PathVariable Long appUserId) {
		appUserService.deleteUser(appUserId);
		return ResponseEntity.noContent().build();
	}
}
