package com.example.kanban.security;

import org.springframework.security.core.context.SecurityContextHolder;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SecurityUtil {

	public static String getCurrentUserEmail() {
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
}