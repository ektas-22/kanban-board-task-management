package com.example.kanban.service;

import org.springframework.data.domain.Page;

import com.example.kanban.dto.appuser.UserResponseDto;
import com.example.kanban.dto.task.TaskResponseDto;

public interface AdminService {

	// User Management
	Page<UserResponseDto> getAllUsers(int page, int size, String sortBy, String direction);

	UserResponseDto getUserById(Long userId);

	void deleteUser(Long userId);

	// Task Management
	Page<TaskResponseDto> getAllTasks(int page, int size, String sortBy, String direction);

	TaskResponseDto getTaskBydId(Long taskId);

	void deleteTask(Long taskId);

}