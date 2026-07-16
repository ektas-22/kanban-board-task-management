package com.example.kanban.service;

import com.example.kanban.dto.appuser.UserResponseDto;

public interface UserService {

	UserResponseDto getProfile();

	UserResponseDto updateProfile();

	void changePassword();
}
