package com.example.kanban.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum TaskStatus {
	TODO, IN_PROGRESS, DONE;

	@JsonCreator
	public static TaskStatus from(String value) {
		if (value == null || value.trim().isEmpty()) {
			return TODO;
		}
		try {
			return TaskStatus.valueOf(value);
		} catch (Exception e) {
			return TODO;
		}
	}

}