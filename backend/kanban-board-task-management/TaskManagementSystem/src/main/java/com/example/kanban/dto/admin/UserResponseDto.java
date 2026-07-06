package com.example.kanban.dto.admin;

import com.example.kanban.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserResponseDto {

	private Long id;
	private String username;
	private String email;
	private Role role;
}
