package com.example.kanban.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserRequest {

	@NotBlank(message = "Name cannot be empty.")
	@Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters.")
	private String name;

	@NotBlank(message = "Email cannot be empty.")
	@Email(message = "Invalid email format.")
	private String email;

	@NotBlank(message = "Password cannot be empty.")
	@Size(min = 6, message = "NPassword must be at least 6 characters.")
	private String password;

}
