package com.example.kanban.mapper;

import com.example.kanban.dto.TaskRequestDto;
import com.example.kanban.dto.TaskResponseDto;
import com.example.kanban.entity.Task;

//@Mapper(componentModel="spring")
public class TaskMapper {

	// DTO → Entity
	public static Task toEntity(TaskRequestDto taskResponseDto) {
		Task task = new Task();
		task.setTitle(taskResponseDto.getTitle());
		task.setDescription(taskResponseDto.getDescription());
		task.setStatus(taskResponseDto.getStatus());
		return task;
	}

	// Entity → Response DTO
	public static TaskResponseDto toResponseDto(Task task) {
		TaskResponseDto taskResponseDto = new TaskResponseDto();
		taskResponseDto.setTitle(task.getTitle());
		taskResponseDto.setDescription(task.getDescription());
		taskResponseDto.setStatus(task.getStatus());
		return taskResponseDto;
	}

	// Update existing entity from DTO
	public static void updateEntity(Task task, TaskRequestDto taskRequestDto) {
		task.setTitle(taskRequestDto.getTitle());
		task.setDescription(taskRequestDto.getDescription());
		task.setStatus(taskRequestDto.getStatus());
	}
}
