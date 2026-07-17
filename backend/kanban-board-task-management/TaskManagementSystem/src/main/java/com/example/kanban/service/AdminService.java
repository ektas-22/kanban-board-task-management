package com.example.kanban.service;

import java.util.List;

import com.example.kanban.dto.appuser.UserResponseDto;

public interface AdminService {

    List<UserResponseDto> getAllUsers();

    UserResponseDto getUserWithTasks(Long userId);

    void deleteUser(Long userId);

    void deleteTask(Long taskId);

    void updateUserRole(Long userId, String role);

    Long getTotalUsers();

    Long getTotalTasks();
}