package com.example.kanban.controller;

import com.example.kanban.entity.Task;
import com.example.kanban.response.ApiResponse;
import com.example.kanban.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {

	private final TaskService taskService;

	@PostMapping
	public ResponseEntity<ApiResponse<Task>> createTask(@Valid @RequestBody Task task) {

		Task savedTask = taskService.createTask(task);

		ApiResponse<Task> response = ApiResponse.<Task>builder().success(true).message("Task created successfully")
				.data(savedTask).timestamp(LocalDateTime.now()).build();

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping
	public ResponseEntity<ApiResponse<List<Task>>> getAllTasks() {

		List<Task> tasks = taskService.getAllTasks();

		ApiResponse<List<Task>> response = ApiResponse.<List<Task>>builder().success(true)
				.message("Tasks fetched successfully").data(tasks).timestamp(LocalDateTime.now()).build();

		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<Task>> getTaskById(@PathVariable Long id) {

		Task task = taskService.getTaskById(id);

		ApiResponse<Task> response = ApiResponse.<Task>builder().success(true).message("Task fetched successfully")
				.data(task).timestamp(LocalDateTime.now()).build();

		return ResponseEntity.ok(response);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<Task>> updateTask(@PathVariable Long id, @Valid @RequestBody Task task) {

		Task updatedTask = taskService.updateTask(id, task);

		ApiResponse<Task> response = ApiResponse.<Task>builder().success(true).message("Task updated successfully")
				.data(updatedTask).timestamp(LocalDateTime.now()).build();

		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteTask(@PathVariable Long id) {

		taskService.deleteTask(id);

		ApiResponse<Void> response = ApiResponse.<Void>builder().success(true).message("Task deleted successfully")
				.timestamp(LocalDateTime.now()).build();

		return ResponseEntity.ok(response);
	}

}
