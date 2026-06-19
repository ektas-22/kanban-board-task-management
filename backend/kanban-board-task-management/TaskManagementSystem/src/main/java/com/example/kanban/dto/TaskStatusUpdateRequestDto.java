package com.example.kanban.dto;

import com.example.kanban.entity.TaskStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskStatusUpdateRequestDto {
	private TaskStatus status;
}
