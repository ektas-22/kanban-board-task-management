package com.example.kanban.service;

import com.example.kanban.dto.user.ChangePasswordRequestDto;
import com.example.kanban.dto.user.UpdateProfileRequestDto;
import com.example.kanban.dto.user.UserResponseDto;

public interface UserService {

	UserResponseDto getProfile();

	UserResponseDto updateProfile(UpdateProfileRequestDto updateProfileRequestDto);

	void changePassword(ChangePasswordRequestDto changePasswordRequestDto);
}
