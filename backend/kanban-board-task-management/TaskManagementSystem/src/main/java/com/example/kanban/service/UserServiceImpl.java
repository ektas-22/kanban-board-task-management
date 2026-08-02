package com.example.kanban.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.kanban.dto.user.ChangePasswordRequestDto;
import com.example.kanban.dto.user.UpdateProfileRequestDto;
import com.example.kanban.dto.user.UserResponseDto;
import com.example.kanban.entity.AppUser;
import com.example.kanban.mapper.UserMapper;
import com.example.kanban.repository.AppUserRepository;
import com.example.kanban.security.SecurityUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

	private final AppUserRepository appUserRepository;
	
	private final SecurityUtil securityUtil;

	@Override
	@Transactional
	public UserResponseDto getProfile() {
		AppUser currentUser = securityUtil.getCurrentUser();
		return UserMapper.toResponseDto(currentUser);
	}

	@Override
	public UserResponseDto updateProfile(UpdateProfileRequestDto updateProfileRequestDto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void changePassword(ChangePasswordRequestDto changePasswordRequestDto) {
		// TODO Auto-generated method stub

	}

}
