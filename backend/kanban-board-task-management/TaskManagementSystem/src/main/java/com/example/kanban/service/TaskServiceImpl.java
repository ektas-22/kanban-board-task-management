package com.example.kanban.service;

import com.example.kanban.entity.Task;
import com.example.kanban.entity.TaskStatus;
import com.example.kanban.exception.ResourceNotFoundException;
import com.example.kanban.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class TaskServiceImpl implements TaskService {

private final TaskRepository taskRepository;

@Override
@Transactional
public Task createTask(Task task) {

    validateTask(task);

    if (task.getStatus() == null) {
        task.setStatus(TaskStatus.TODO);
    }

    log.info("Creating new task with title: {}", task.getTitle());

    return taskRepository.save(task);
}

@Override
public List<Task> getAllTasks() {

    log.debug("Fetching all tasks");

    return taskRepository.findAll();
}

@Override
public Task getTaskById(Long id) {

    validateId(id);

    return taskRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Task not found with id: " + id));
}

@Override
@Transactional
public Task updateTask(Long id, Task task) {

    validateId(id);
    validateTask(task);

    Task existingTask = getTaskById(id);

    existingTask.setTitle(task.getTitle().trim());
    existingTask.setDescription(task.getDescription());

    if (task.getStatus() != null) {
        existingTask.setStatus(task.getStatus());
    }

    log.info("Updating task with id: {}", id);

    return taskRepository.save(existingTask);
}

@Override
@Transactional
public void deleteTask(Long id) {

    validateId(id);

    Task task = getTaskById(id);

    taskRepository.delete(task);

    log.info("Deleted task with id: {}", id);
}

private void validateTask(Task task) {

    if (task == null) {
        throw new IllegalArgumentException(
                "Task request cannot be null");
    }

    if (!StringUtils.hasText(task.getTitle())) {
        throw new IllegalArgumentException(
                "Task title is mandatory");
    }

    if (task.getTitle().length() > 255) {
        throw new IllegalArgumentException(
                "Task title cannot exceed 255 characters");
    }
}

private void validateId(Long id) {

    if (id == null || id <= 0) {
        throw new IllegalArgumentException(
                "Invalid task id");
    }
}


}
