package com.example.kanban.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kanban.entity.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

	boolean existsByEmail(String email);
}
