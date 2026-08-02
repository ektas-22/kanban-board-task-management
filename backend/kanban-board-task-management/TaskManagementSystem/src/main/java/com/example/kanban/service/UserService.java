package com.example.kanban.service;

import com.example.kanban.dto.user.UserResponseDto;

public interface UserService {

	UserResponseDto getProfile();

	UserResponseDto updateProfile();

	void changePassword();
}
