package com.example.kanban.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kanban.dto.TaskRequest;
import com.example.kanban.dto.TaskResponse;
import com.example.kanban.entity.Task;
import com.example.kanban.entity.TaskStatus;
import com.example.kanban.mapper.TaskMapper;
import com.example.kanban.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

	private final TaskRepository taskRepository;

	@Override
	public TaskResponse createTask(TaskRequest taskRequestDto) {
		validateCreateTask(taskRequestDto);
		Task task = TaskMapper.toEntity(taskRequestDto);
		Task savedTask = taskRepository.save(task);
		return TaskMapper.toResponseDto(savedTask);
	}

	@Override
	public List<TaskResponse> getAllTasks() {
		List<Task> taskList = taskRepository.findAll();
		List<TaskResponse> taskResponseDtoList = taskList.stream().map(TaskMapper::toResponseDto).toList();
		return taskResponseDtoList;
	}

	@Override
	public TaskResponse getTaskById(Long id) {
		Task taskId = taskRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Task not found with the id: " + id));

		return TaskMapper.toResponseDto(taskId);
	}

	@Override
	public TaskResponse updateTask(Long id, TaskRequest task) {
		
		return null;
	}

	@Override
	public void deleteTask(Long taskId) {
		taskRepository.deleteById(taskId);
	}

	private void validateCreateTask(TaskRequest taskRequestDto) {
		String title = taskRequestDto.getTitle();
		if (title == null || title.trim().isEmpty()) {
			throw new IllegalArgumentException("Task title cannot be empty");
		}
		if (title.length() > 100) {
			throw new IllegalArgumentException("Task title cannot  exceed 100  characters");
		}
		if (taskRequestDto.getStatus() == null) {
			taskRequestDto.setStatus(TaskStatus.TODO);
		}

	}
}
