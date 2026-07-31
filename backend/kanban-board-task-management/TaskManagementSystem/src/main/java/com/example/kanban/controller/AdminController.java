package com.example.kanban.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kanban.dto.appuser.UserResponseDto;
import com.example.kanban.dto.task.TaskResponseDto;
import com.example.kanban.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

	private final AdminService adminService;

	/**
	 * 
	 * @param page
	 * @param size
	 * @param sortBy
	 * @param direction
	 * @return
	 */
	@GetMapping("/users")
	public ResponseEntity<Page<UserResponseDto>> getAllUsers(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size, @RequestParam(defaultValue = "createdAt") String sortBy,
			@RequestParam(defaultValue = "desc") String direction) {
		return ResponseEntity.ok(adminService.getAllUsers(page, size, direction, direction));
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
	 * 
	 * @param page
	 * @param size
	 * @param direction
	 * @return
	 */
	@GetMapping
	public ResponseEntity<Page<TaskResponseDto>> getAllTasks(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size, @RequestParam(defaultValue = "desc") String direction) {
		return ResponseEntity.ok(adminService.getAllTasks(page, size, direction, direction));
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