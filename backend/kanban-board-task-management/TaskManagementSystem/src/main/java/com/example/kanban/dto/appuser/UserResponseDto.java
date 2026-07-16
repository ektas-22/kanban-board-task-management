package com.example.kanban.dto.appuser;

import com.example.kanban.enums.Role;

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
