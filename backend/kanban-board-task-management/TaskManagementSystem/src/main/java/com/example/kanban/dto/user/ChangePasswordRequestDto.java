package com.example.kanban.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequestDto {

	private String currentPassword;
	
	private String newPassword;
}
