package com.example.kanban.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.kanban.dto.appuser.UserResponseDto;
import com.example.kanban.dto.task.TaskResponseDto;
import com.example.kanban.entity.AppUser;
import com.example.kanban.entity.Task;
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
	@Transactional(readOnly = true)
	public Page<UserResponseDto> getAllUsers(int page, int size, String sortBy, String direction) {
		Sort sort = direction.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
		Pageable pageable= PageRequest.of(page, size,sort);
		Page<AppUser> userPage = appUserRepository.findAll(pageable);
		return userPage.map(UserMapper::toResponseDto);
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
	public Page<TaskResponseDto> getAllTasks(int page, int size, String sortBy, String direction) {
		Sort sort = direction.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
		Pageable pageable= PageRequest.of(page, size,sort);
		Page<Task> userPage = taskRepository.findAll(pageable);
		return userPage.map(TaskMapper::toResponseDto);
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
