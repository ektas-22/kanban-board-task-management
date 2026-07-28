package com.example.kanban.service;

import org.springframework.data.domain.Page;

import com.example.kanban.dto.task.TaskRequestDto;
import com.example.kanban.dto.task.TaskResponseDto;
import com.example.kanban.enums.TaskStatus;

public interface TaskService {
	TaskResponseDto createTask(TaskRequestDto taskRequestDto);

	Page<TaskResponseDto> getMyTasks(int page, int size, String sortBy);

	TaskResponseDto getTaskById(Long id);

	TaskResponseDto updateTask(Long id, TaskRequestDto taskRequestDto);

	TaskResponseDto updateTaskStatus(Long id, TaskStatus status);
	
	void deleteTask(Long id);

}
