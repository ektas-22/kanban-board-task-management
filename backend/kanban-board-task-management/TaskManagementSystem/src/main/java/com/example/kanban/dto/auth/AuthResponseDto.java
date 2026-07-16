package com.example.kanban.dto.auth;

import com.example.kanban.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {

	private String token;
	private String tokenType;
	private String name;
	private String email;
	private Role role;
}
