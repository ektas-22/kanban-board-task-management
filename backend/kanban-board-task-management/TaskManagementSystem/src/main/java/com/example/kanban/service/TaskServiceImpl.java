package com.example.kanban.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kanban.dto.TaskRequestDto;
import com.example.kanban.dto.TaskResponseDto;
import com.example.kanban.entity.Task;
import com.example.kanban.entity.TaskStatus;
import com.example.kanban.exception.ResourceNotFoundException;
import com.example.kanban.mapper.TaskMapper;
import com.example.kanban.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

	private final TaskRepository taskRepository;

	@Override
	public TaskResponseDto createTask(TaskRequestDto taskRequestDto) {
		validateTask(taskRequestDto);
		Task task = TaskMapper.toEntity(taskRequestDto);
		Task savedTask = taskRepository.save(task);
		return TaskMapper.toResponseDto(savedTask);
	}

	@Override
	public List<TaskResponseDto> getAllTasks() {
		return taskRepository.findAll().stream().map(TaskMapper::toResponseDto).toList();

	}

	@Override
	public TaskResponseDto getTaskById(Long id) {
		Task taskId = taskRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found with the id: " + id));

		return TaskMapper.toResponseDto(taskId);
	}

	@Override
	public TaskResponseDto updateTask(Long id, TaskRequestDto taskRequestDto) {
		Task existingTask = taskRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found with the id: " + id));

		validateTask(taskRequestDto);
		TaskMapper.updateEntity(existingTask, taskRequestDto);
		Task updatedTask = taskRepository.save(existingTask);
		return TaskMapper.toResponseDto(updatedTask);
	}

	@Override
	public TaskResponseDto updateTaskStatus(Long id, TaskStatus status) {
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found with this id : " + id));
		TaskMapper.updateStatus(task, status);
		Task updatedTaskStatus = taskRepository.save(task);
		return TaskMapper.toResponseDto(updatedTaskStatus);
	}

	@Override
	public void deleteTask(Long id) {
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found with the id: " + id));
		taskRepository.delete(task);
	}

	private void validateTask(TaskRequestDto taskRequestDto) {
		if (taskRequestDto.getTitle() == null || taskRequestDto.getTitle().trim().isEmpty()) {
			throw new IllegalArgumentException("Task title cannot be empty");
		}
		if (taskRequestDto.getTitle().length() > 100) {
			throw new IllegalArgumentException("Task title cannot  exceed 100  characters");
		}
		if (taskRequestDto.getDescription() != null && taskRequestDto.getDescription().length() > 1000) {
			throw new IllegalArgumentException("Description too long");
		}
	}

//	private Task buildTask(TaskRequestDto dto) {
//		return TaskMapper.toEntity(dto);
//	}

}
