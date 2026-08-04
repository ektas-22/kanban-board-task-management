package com.boardtask.main.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.kanban.dto.task.TaskRequestDto;
import com.example.kanban.dto.task.TaskResponseDto;
import com.example.kanban.entity.AppUser;
import com.example.kanban.entity.Task;
import com.example.kanban.enums.TaskStatus;
import com.example.kanban.repository.AppUserRepository;
import com.example.kanban.repository.TaskRepository;
import com.example.kanban.security.SecurityUtil;
import com.example.kanban.service.TaskServiceImpl;

@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {

	@Mock
	TaskRepository taskRepository;

	@Mock
	AppUserRepository appUserRepository;

	@Mock
	SecurityUtil securityUtil;

	@InjectMocks
	TaskServiceImpl taskService;

	@Test
	void shouldCreateTaskSuccessfully() {
		AppUser appUser = AppUser.builder().id(1L).name("Junior").email("abc@gmail.com").build();

		TaskRequestDto taskRequestDto = new TaskRequestDto("Spring boot Project", "Complete a CRUD application");
		Task savedTask = Task.builder().id(1L).title(taskRequestDto.getTitle())
				.description(taskRequestDto.getDescription()).status(TaskStatus.TODO).appUser(appUser).build();

		when(securityUtil.getCurrentUser()).thenReturn(appUser);
		when(taskRepository.save(any(Task.class))).thenReturn(savedTask);

		TaskResponseDto taskResponseDto = taskService.createTask(taskRequestDto);

		assertEquals("Spring boot Project", taskResponseDto.getTitle());
		assertEquals(TaskStatus.TODO, taskResponseDto.getStatus());

		verify(taskRepository).save(any(Task.class));
	}
}
