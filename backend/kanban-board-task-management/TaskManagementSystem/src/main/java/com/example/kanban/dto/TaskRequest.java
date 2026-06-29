package com.example.kanban.dto;

import com.example.kanban.entity.TaskStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

	@NotBlank(message = "Title cannot be empty")
	@Size(max = 100, message = "Title cannot exceed 100 characters")
	private String title;

	@Size(max = 1000, message = "Description too long")
	private String description;

	@NotNull(message = "Status is required")
	private TaskStatus status;
}
