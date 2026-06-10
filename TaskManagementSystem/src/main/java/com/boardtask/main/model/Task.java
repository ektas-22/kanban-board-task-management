package com.boardtask.main.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity class
 */
@Entity
@Table(name = "task")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long taskId;
	private String taskTitle;
	private String taskDescription;
	private String taskStatus;

	@Override
	public String toString() {
		return "Task [taskId=" + taskId + ", taskTitle=" + taskTitle + ", taskDescription=" + taskDescription
				+ ", taskStatus=" + taskStatus + "]";
	}

}
