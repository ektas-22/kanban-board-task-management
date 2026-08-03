package com.example.kanban.service;

import org.springframework.data.domain.Page;

import com.example.kanban.dto.admin.AdminDashboardResponseDto;
import com.example.kanban.dto.task.TaskResponseDto;
import com.example.kanban.dto.user.UserResponseDto;

public interface AdminService {

	// User Management
	Page<UserResponseDto> getAllUsers(int page, int size, String sortBy, String direction);

	UserResponseDto getUserById(Long userId);

	void deleteUser(Long userId);

	// Task Management
	Page<TaskResponseDto> getAllTasks(int page, int size, String sortBy, String direction);

	TaskResponseDto getTaskById(Long taskId);

	void deleteTask(Long taskId);
	
	//Dash board
	AdminDashboardResponseDto getDashboard();

}