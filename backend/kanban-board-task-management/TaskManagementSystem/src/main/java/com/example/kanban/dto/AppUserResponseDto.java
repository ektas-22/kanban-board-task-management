package com.example.kanban.dto;

import com.example.kanban.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUserResponseDto {

	private Long id;
	private String name;
	private String email;
	private Role role;
}
