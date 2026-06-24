package com.example.kanban.repository;

import com.example.kanban.entity.Task;
import com.example.kanban.entity.TaskStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/*
 * 
 */
public interface TaskRepository extends JpaRepository<Task, Long> {
	List<Task> findByStatus(TaskStatus status);
	List<Task> findByTitleIgnoreCase(String keyword);
}