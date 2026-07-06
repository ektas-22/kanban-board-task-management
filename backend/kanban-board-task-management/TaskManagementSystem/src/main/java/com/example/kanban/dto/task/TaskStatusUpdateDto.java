package com.example.kanban.dto.task;

import com.example.kanban.entity.TaskStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TaskStatusUpdateDto {

	private TaskStatus status;
}
