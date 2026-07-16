package com.example.kanban.dto.appuser;

import java.util.List;

import com.example.kanban.dto.task.TaskResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserWithTaskDto {

	private Long id;
	private String username;
	private List<TaskResponseDto> tasks;
}
