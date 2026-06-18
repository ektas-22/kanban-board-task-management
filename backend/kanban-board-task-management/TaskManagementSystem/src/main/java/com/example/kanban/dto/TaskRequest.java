package com.example.kanban.dto;

import com.example.kanban.entity.TaskStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskRequest {
	private String title;
	
	private String description;
	
	private TaskStatus status;
}
