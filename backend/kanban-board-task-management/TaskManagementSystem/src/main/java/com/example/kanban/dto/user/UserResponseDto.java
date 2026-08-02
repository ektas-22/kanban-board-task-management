package com.example.kanban.dto.user;

import java.time.LocalDateTime;

import com.example.kanban.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

	private Long id;
	private String name;
	private String email;
	private Role role;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
