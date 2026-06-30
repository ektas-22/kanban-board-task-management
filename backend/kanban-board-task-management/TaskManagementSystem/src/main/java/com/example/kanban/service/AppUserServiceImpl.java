package com.example.kanban.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kanban.dto.AppUserRequestDto;
import com.example.kanban.dto.AppUserResponseDto;
import com.example.kanban.entity.AppUser;
import com.example.kanban.exception.ResourceNotFoundException;
import com.example.kanban.mapper.AppUserMapper;
import com.example.kanban.repository.AppUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements AppUserService {

	private final AppUserRepository userRepository;

	@Override
	public AppUserResponseDto createUser(AppUserRequestDto userRequestDto) {
		validateUser(userRequestDto);
		AppUser user = AppUserMapper.toEntity(userRequestDto);
		AppUser saveUser = userRepository.save(user);
		return AppUserMapper.toResponseDto(saveUser);
	}

	@Override
	public List<AppUserResponseDto> getAllUsers() {
		return userRepository.findAll().stream().map(AppUserMapper::toResponseDto).toList();
	}

	@Override
	public AppUserResponseDto getUserById(Long id) {
		AppUser foundUser = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with this id: " + id));
		return AppUserMapper.toResponseDto(foundUser);
	}

	@Override
	public AppUserResponseDto updateUser(Long id, AppUserRequestDto userRequestDto) {
		AppUser existingUser = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with this id: " + id));
		validateUserForUpdate(id, userRequestDto);
		AppUserMapper.updateEntity(existingUser, userRequestDto);
		AppUser updatedUser = userRepository.save(existingUser);
		return AppUserMapper.toResponseDto(updatedUser);
	}

	@Override
	public void deleteUser(Long id) {
		AppUser user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with this id: " + id));
		userRepository.delete(user);

	}

	private void validateUser(AppUserRequestDto userRequestDto) {
		if (userRequestDto.getName() == null && userRequestDto.getName().trim().isEmpty()) {
			throw new IllegalArgumentException("Name cannot be null or empty.");
		}
		if (userRepository.existsByEmail(userRequestDto.getEmail())) {
			throw new IllegalArgumentException("Email already exists");
		}
	}

	private void validateUserForUpdate(Long id, AppUserRequestDto userRequestDto) {
		if (userRequestDto.getName() == null && userRequestDto.getName().trim().isEmpty()) {
			throw new IllegalArgumentException("Name cannot be null or empty.");
		}
		userRepository.findById(id).ifPresent(existingUser -> {
			if (!existingUser.getEmail().equals(userRequestDto.getEmail())
					&& userRepository.existsByEmail(userRequestDto.getEmail())) {
				throw new IllegalArgumentException("Email already in use");
			}
		});
	}

}
