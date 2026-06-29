package com.example.kanban.service;

import java.util.List;

import com.example.kanban.dto.TaskRequest;
import com.example.kanban.dto.TaskResponse;

public interface TaskService {
	TaskResponse createTask(TaskRequest task);

	List<TaskResponse> getAllTasks();

	TaskResponse getTaskById(Long id);

	TaskResponse updateTask(Long id, TaskRequest task);

	void deleteTask(Long id);

}
