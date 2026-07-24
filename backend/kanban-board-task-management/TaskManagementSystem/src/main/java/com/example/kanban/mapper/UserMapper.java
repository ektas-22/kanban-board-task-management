package com.example.kanban.mapper;

import com.example.kanban.dto.appuser.UserResponseDto;
import com.example.kanban.entity.AppUser;

public class UserMapper {
	// Entity -> Response DTO
	public static UserResponseDto toResponseDto(AppUser user) {
		return UserResponseDto.builder().id(user.getId()).name(user.getName()).email(user.getEmail())
				.role(user.getRole()).createdAt(user.getCreatedAt()).updatedAt(user.getUpdatedAt()).build();
	}
}
