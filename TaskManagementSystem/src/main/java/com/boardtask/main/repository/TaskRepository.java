package com.boardtask.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boardtask.main.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
