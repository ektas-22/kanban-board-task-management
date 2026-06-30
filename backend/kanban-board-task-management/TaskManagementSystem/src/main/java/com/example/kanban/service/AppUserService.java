package com.example.kanban.service;

import java.util.List;

import com.example.kanban.dto.AppUserRequestDto;
import com.example.kanban.dto.AppUserResponseDto;

public interface AppUserService {

	AppUserResponseDto createUser(AppUserRequestDto userRequestDto);

	List<AppUserResponseDto> getAllUsers();

	AppUserResponseDto getUserById(Long id);

	AppUserResponseDto updateUser(Long id, AppUserRequestDto userRequestDto);

	void deleteUser(Long id);
}
