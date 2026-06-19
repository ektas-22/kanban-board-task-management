package com.example.kanban.service;

import java.util.List;

import com.example.kanban.dto.TaskRequestDto;
import com.example.kanban.dto.TaskResponseDto;

public interface TaskService {
	TaskResponseDto createTask(TaskRequestDto task);

	List<TaskResponseDto> getAllTasks();

	TaskResponseDto getTaskById(Long id);

	TaskResponseDto updateTask(Long id, TaskRequestDto task);

	void deleteTask(Long id);

}
