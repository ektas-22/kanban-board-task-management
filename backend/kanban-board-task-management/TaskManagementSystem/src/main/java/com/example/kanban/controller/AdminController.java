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

import com.example.kanban.dto.task.TaskResponseDto;
import com.example.kanban.dto.user.UserResponseDto;
import com.example.kanban.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

	private final AdminService adminService;
//	User Management
//	GET /admin/users
//	GET /admin/users/{id}
//	DELETE /admin/users/{id}
//	Task Management
//	GET /admin/tasks
//	GET /admin/tasks/{id}
//	DELETE /admin/tasks/{id}
//	Dashboard -
//	{ totalUsers, totalTasks, completedTasks, todoTasks, inProgressTasks}
//GET /admin/dashboard

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

	@GetMapping("/users/{userId}")
	public ResponseEntity<UserResponseDto> getUser(@PathVariable Long userId) {
		return ResponseEntity.ok(adminService.getUserById(userId));
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

	@GetMapping("/tasks/{taskId}")
	public ResponseEntity<TaskResponseDto> getTask(@PathVariable Long taskId) {
		return ResponseEntity.ok(adminService.getTaskBydId(taskId));
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