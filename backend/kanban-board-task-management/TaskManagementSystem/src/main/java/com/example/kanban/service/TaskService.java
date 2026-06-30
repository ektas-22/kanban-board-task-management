package com.example.kanban.service;

import java.util.List;

import com.example.kanban.dto.TaskRequestDto;
import com.example.kanban.dto.TaskResponseDto;
import com.example.kanban.entity.TaskStatus;

public interface TaskService {
	TaskResponseDto createTask(TaskRequestDto taskRequestDto);

	List<TaskResponseDto> getAllTasks();

	TaskResponseDto getTaskById(Long id);

	TaskResponseDto updateTask(Long id, TaskRequestDto taskRequestDto);

	TaskResponseDto updateTaskStatus(Long id, TaskStatus status);
	
	void deleteTask(Long id);

}
