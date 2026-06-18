package com.example.kanban.service;

import java.util.List;

import com.example.kanban.entity.Task;

public interface TaskService {
	Task createTask(Task task);

	List<Task> getAllTasks();

	Task getTaskById(Long id);

	Task updateTask(Long id, Task task);

	void deleteTask(Long id);
}
