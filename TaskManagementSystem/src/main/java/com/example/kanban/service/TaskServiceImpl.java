package com.example.kanban.service;

import com.example.kanban.entity.Task;
import com.example.kanban.entity.TaskStatus;
import com.example.kanban.exception.ResourceNotFoundException;
import com.example.kanban.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public Task createTask(Task task) {
        if (task.getStatus() == null) {
            task.setStatus(TaskStatus.TODO);
        }
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id " + id));
    }

    @Override
    public Task updateTask(Long id, Task task) {

        Task existingTask = getTaskById(id);

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setStatus(task.getStatus());

        return taskRepository.save(existingTask);
    }

    @Override
    public void deleteTask(Long id) {

        Task task = getTaskById(id);
        taskRepository.delete(task);
    }
}