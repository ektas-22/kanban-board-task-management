package com.example.kanban.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kanban.entity.AppUser;
import com.example.kanban.entity.Task;
import com.example.kanban.enums.TaskStatus;

public interface TaskRepository extends JpaRepository<Task, Long> {
	List<Task> findByStatus(TaskStatus status);

	List<Task> findByTitleIgnoreCase(String keyword);

	Optional<Task> findByIdAndUser(Long id, AppUser user);

	List<Task> findByAppUser(AppUser appUser);

	Optional<Task> findByIdAndAppUser(Long id, AppUser appUser);
}