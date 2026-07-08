package com.example.kanban.service;

import com.example.kanban.dto.auth.AuthResponseDto;
import com.example.kanban.dto.auth.LoginRequestDto;
import com.example.kanban.dto.auth.RegisterRequestDto;

public interface AuthService {
	AuthResponseDto register(RegisterRequestDto registerRequestDto);

	AuthResponseDto login(LoginRequestDto loginRequestDto);

}
