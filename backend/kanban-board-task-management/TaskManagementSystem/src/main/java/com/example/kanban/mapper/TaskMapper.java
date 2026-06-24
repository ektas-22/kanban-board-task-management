package com.example.kanban.mapper;

import com.example.kanban.dto.TaskRequestDto;
import com.example.kanban.dto.TaskResponseDto;
import com.example.kanban.entity.Task;

public class TaskMapper {

	// DTO → Entity
	public static Task toEntity(TaskRequestDto taskRequestDto) {
		Task task = new Task();
		task.setTitle(taskRequestDto.getTitle());
		task.setDescription(taskRequestDto.getDescription());
		task.setStatus(taskRequestDto.getStatus());
		return task;
	}

	// Entity → Response DTO
	public static TaskResponseDto toResponseDto(Task task) {
		TaskResponseDto taskResponseDto = new TaskResponseDto();
		taskResponseDto.setId(task.getId());
		taskResponseDto.setTitle(task.getTitle());
		taskResponseDto.setDescription(task.getDescription());
		taskResponseDto.setStatus(task.getStatus());
		taskResponseDto.setCreatedAt(task.getCreatedAt());
		taskResponseDto.setUpdatedAt(task.getUpdatedAt());
		return taskResponseDto;
	}

	// Update existing entity from DTO
	public static void updateEntity(Task task, TaskRequestDto taskRequestDto) {
		task.setTitle(taskRequestDto.getTitle());
		task.setDescription(taskRequestDto.getDescription());
		task.setStatus(taskRequestDto.getStatus());
	}
}
