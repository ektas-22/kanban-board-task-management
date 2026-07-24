package com.example.kanban.service;

import java.util.List;

import com.example.kanban.dto.appuser.UserResponseDto;
import com.example.kanban.dto.task.TaskResponseDto;

public interface AdminService {

	// User Management
	List<UserResponseDto> getAllUsers();

	UserResponseDto getUserById(Long userId);

	void deleteUser(Long userId);

	// Task Management
	List<TaskResponseDto> getAllTask();

	TaskResponseDto getTaskBydId(Long taskId);

	void deleteTask(Long taskId);

}