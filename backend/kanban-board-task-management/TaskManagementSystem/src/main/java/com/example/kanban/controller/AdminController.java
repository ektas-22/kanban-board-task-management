package com.example.kanban.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kanban.dto.appuser.UserResponseDto;
import com.example.kanban.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

	private final AdminService adminService;

	/**
	 * Get all registered users.
	 * 
	 * @return
	 */
	@GetMapping("/users")
	public ResponseEntity<List<UserResponseDto>> getAllUsers() {
		return ResponseEntity.ok(adminService.getAllUsers());
	}

	/**
	 * Delete a user.
	 * 
	 * @param userId
	 * @return
	 */
	@DeleteMapping("/users/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable Long userId) {

		adminService.deleteUser(userId);
		return ResponseEntity.ok("User deleted successfully.");
	}

	/**
	 * Delete any task.
	 * 
	 * @param taskId
	 * @return
	 */
	@DeleteMapping("/tasks/{taskId}")
	public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {

		adminService.deleteTask(taskId);
		return ResponseEntity.ok("Task deleted successfully.");
	}

}