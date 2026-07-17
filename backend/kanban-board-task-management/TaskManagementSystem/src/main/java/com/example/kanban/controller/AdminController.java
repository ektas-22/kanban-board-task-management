package com.example.kanban.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kanban.dto.appuser.UserResponseDto;
import com.example.kanban.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    /**
     * Get all registered users.
     */
    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    /**
     * Get a specific user along with all assigned tasks.
     */
    @GetMapping("/users/{userId}")
    public ResponseEntity<com.example.kanban.dto.appuser.UserResponseDto> getUserById(
            @PathVariable Long userId) {

        return ResponseEntity.ok(adminService.getUserWithTasks(userId));
    }

    /**
     * Delete a user.
     */
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long userId) {

        adminService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }

    /**
     * Delete any task.
     */
    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long taskId) {

        adminService.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully.");
    }

    /**
     * Update user role.
     * Example:
     * PUT /api/admin/users/1/role?role=ADMIN
     */
    @PutMapping("/users/{userId}/role")
    public ResponseEntity<String> updateUserRole(
            @PathVariable Long userId,
            @RequestParam String role) {

        adminService.updateUserRole(userId, role);
        return ResponseEntity.ok("User role updated successfully.");
    }

    /**
     * Total users count.
     */
    @GetMapping("/stats/users")
    public ResponseEntity<Long> getTotalUsers() {
        return ResponseEntity.ok(adminService.getTotalUsers());
    }

    /**
     * Total tasks count.
     */
    @GetMapping("/stats/tasks")
    public ResponseEntity<Long> getTotalTasks() {
        return ResponseEntity.ok(adminService.getTotalTasks());
    }
}