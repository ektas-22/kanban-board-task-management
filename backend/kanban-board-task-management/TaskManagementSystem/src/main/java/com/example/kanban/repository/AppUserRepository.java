package com.example.kanban.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kanban.entity.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

	boolean existsByEmail(String email);

	 Optional<AppUser> findByUserName(String username);

	 Optional<AppUser> findByEmail(String email);
	
//	List<Task> findByUser(AppUser user);
}
