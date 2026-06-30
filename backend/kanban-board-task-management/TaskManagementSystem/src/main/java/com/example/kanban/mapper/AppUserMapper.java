package com.example.kanban.mapper;

import com.example.kanban.dto.AppUserRequestDto;
import com.example.kanban.dto.AppUserResponseDto;
import com.example.kanban.entity.AppUser;

public class AppUserMapper {

	// DTO -> Entity
	public static AppUser toEntity(AppUserRequestDto userRequestDto) {
		AppUser user = new AppUser();
		user.setName(userRequestDto.getName());
		user.setEmail(userRequestDto.getEmail());
		user.setPassword(userRequestDto.getPassword());
		return user;
	}

	// Entity -> DTO
	public static AppUserResponseDto toResponseDto(AppUser appUser) {
		AppUserResponseDto userResponseDto = new AppUserResponseDto();
		userResponseDto.setId(appUser.getId());
		userResponseDto.setName(appUser.getName());
		userResponseDto.setEmail(appUser.getEmail());
		return userResponseDto;
	}

	// Update existing entity from dto
	public static void updateEntity(AppUser appUser, AppUserRequestDto userRequestDto) {
		appUser.setName(userRequestDto.getName());
		appUser.setEmail(userRequestDto.getEmail());
//		appUser.setPassword(userRequestDto.getPassword());
	}
}
