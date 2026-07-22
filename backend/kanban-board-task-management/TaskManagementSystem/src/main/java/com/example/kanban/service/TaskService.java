package com.example.kanban.service;

import java.util.List;

import com.example.kanban.dto.task.TaskRequestDto;
import com.example.kanban.dto.task.TaskResponseDto;
import com.example.kanban.enums.TaskStatus;

public interface TaskService {
	TaskResponseDto createTask(TaskRequestDto taskRequestDto);

	List<TaskResponseDto> getMyTasks();

	TaskResponseDto getTaskById(Long id);

	TaskResponseDto updateTask(Long id, TaskRequestDto taskRequestDto);

	TaskResponseDto updateTaskStatus(Long id, TaskStatus status);
	
	void deleteTask(Long id);

}
