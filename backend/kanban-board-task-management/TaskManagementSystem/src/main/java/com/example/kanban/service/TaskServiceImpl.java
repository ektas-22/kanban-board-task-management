package com.example.kanban.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.kanban.dto.task.TaskRequestDto;
import com.example.kanban.dto.task.TaskResponseDto;
import com.example.kanban.entity.AppUser;
import com.example.kanban.entity.Task;
import com.example.kanban.enums.TaskStatus;
import com.example.kanban.exception.ResourceNotFoundException;
import com.example.kanban.mapper.TaskMapper;
import com.example.kanban.repository.AppUserRepository;
import com.example.kanban.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {

	private final TaskRepository taskRepository;
	private final AppUserRepository appUserRepository;

	@Override
	@Transactional(readOnly = true)
	public TaskResponseDto createTask(TaskRequestDto taskRequestDto) {
		AppUser currentUser = getCurrentUser();
		Task task = TaskMapper.toEntity(taskRequestDto);
		task.setAppUser(currentUser);
		task.setStatus(TaskStatus.TODO);
		Task savedTask = taskRepository.save(task);
		return TaskMapper.toResponseDto(savedTask);
	}

	@Override
	@Transactional(readOnly = true)
	public List<TaskResponseDto> getMyTask() {
		AppUser currentUser = getCurrentUser();
		return taskRepository.findByAppUser(currentUser).stream().map(TaskMapper::toResponseDto).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public TaskResponseDto getTaskById(Long id) {
		Task task = getTaskForCurrentUser(id);
		return TaskMapper.toResponseDto(task);
	}

	@Override
	@Transactional
	public TaskResponseDto updateTask(Long id, TaskRequestDto taskRequestDto) {
		Task task = getTaskForCurrentUser(id);
		TaskMapper.updateEntity(task, taskRequestDto);
		Task updatedTask = taskRepository.save(task);
		return TaskMapper.toResponseDto(updatedTask);
	}

	@Override
	@Transactional
	public TaskResponseDto updateTaskStatus(Long id, TaskStatus status) {
		Task task = getTaskForCurrentUser(id);
		task.setStatus(status);
		Task updatedTask = taskRepository.save(task);
		return TaskMapper.toResponseDto(updatedTask);
	}

	@Override
	@Transactional
	public void deleteTask(Long id) {
		Task task = getTaskForCurrentUser(id);
		taskRepository.delete(task);
	}

	private AppUser getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		return appUserRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
	}

	private Task getTaskForCurrentUser(Long id) {
		AppUser currentUser = getCurrentUser();
		return taskRepository.findByIdAndUser(id, currentUser)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found."));
	}
}
