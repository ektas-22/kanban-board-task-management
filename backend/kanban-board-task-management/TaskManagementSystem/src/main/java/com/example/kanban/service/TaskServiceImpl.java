package com.example.kanban.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kanban.dto.TaskRequestDto;
import com.example.kanban.dto.TaskResponseDto;
import com.example.kanban.entity.Task;
import com.example.kanban.mapper.TaskMapper;
import com.example.kanban.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

	private final TaskRepository taskRepository;

	@Override
	public TaskResponseDto createTask(TaskRequestDto taskRequestDto) {
		Task task = TaskMapper.toEntity(taskRequestDto);
		taskRepository.save(task);
		return TaskMapper.toResponseDto(task);
	}

	@Override
	public List<TaskResponseDto> getAllTasks() {
		return null;
	}

	@Override
	public TaskResponseDto getTaskById(Long id) {
		return null;
	}

	@Override
	public TaskResponseDto updateTask(Long id, TaskRequestDto task) {
		return null;
	}

	@Override
	public void deleteTask(Long id) {
	}

}
