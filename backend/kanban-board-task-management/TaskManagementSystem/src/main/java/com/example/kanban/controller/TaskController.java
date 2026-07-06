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

import com.example.kanban.dto.task.TaskRequestDto;
import com.example.kanban.dto.task.TaskResponseDto;
import com.example.kanban.service.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

	private final TaskService taskService;

	@PostMapping
	public ResponseEntity<TaskResponseDto> createTask(@Valid @RequestBody TaskRequestDto taskRequestDto) {
		TaskResponseDto taskResponseDto = taskService.createTask(taskRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(taskResponseDto);
	}

	@GetMapping
	public ResponseEntity<List<TaskResponseDto>> getAllTask() {
		List<TaskResponseDto> taskResponseDto = taskService.getAllTasks();
		return ResponseEntity.status(HttpStatus.OK).body(taskResponseDto);
	}

	@GetMapping("/{id}")
	public ResponseEntity<TaskResponseDto> getTaskById(@PathVariable Long taskId) {
		TaskResponseDto taskResponseDto = taskService.getTaskById(taskId);
		return ResponseEntity.ok(taskResponseDto);
	}

	@PutMapping("/{id}")
	public ResponseEntity<TaskResponseDto> updateTask(@PathVariable Long taskId,
			@Valid @RequestBody TaskRequestDto taskRequestDto) {
		TaskResponseDto taskResponseDto = taskService.updateTask(taskId, taskRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(taskResponseDto);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<TaskResponseDto> deleteTask(@PathVariable Long taskId) {
		taskService.deleteTask(taskId);
		return ResponseEntity.noContent().build();
	}

}
