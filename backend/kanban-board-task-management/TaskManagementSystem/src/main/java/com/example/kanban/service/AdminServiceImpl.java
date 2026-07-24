package com.example.kanban.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.kanban.dto.appuser.UserResponseDto;
import com.example.kanban.dto.task.TaskResponseDto;
import com.example.kanban.exception.ResourceNotFoundException;
import com.example.kanban.mapper.TaskMapper;
import com.example.kanban.mapper.UserMapper;
import com.example.kanban.repository.AppUserRepository;
import com.example.kanban.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {

	private final TaskRepository taskRepository;
	private final AppUserRepository appUserRepository;

	/**
	 * List of all the users
	 */
	@Override
	public List<UserResponseDto> getAllUsers() {
		return appUserRepository.findAll().stream().map(UserMapper::toResponseDto).toList();
	}

	@Override
	public UserResponseDto getUserById(Long userId) {
		return appUserRepository.findById(userId).map(UserMapper::toResponseDto)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with the id" + userId));
	}

	@Override
	public void deleteUser(Long userId) {
		appUserRepository.deleteById(userId);
	}

	@Override
	public List<TaskResponseDto> getAllTask() {
		return taskRepository.findAll().stream().map(TaskMapper::toResponseDto).toList();
	}

	@Override
	public TaskResponseDto getTaskBydId(Long taskId) {
		return taskRepository.findById(taskId).map(TaskMapper::toResponseDto)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found with the id" + taskId));
	}

	@Override
	public void deleteTask(Long taskId) {
		taskRepository.deleteById(taskId);
	}

}
