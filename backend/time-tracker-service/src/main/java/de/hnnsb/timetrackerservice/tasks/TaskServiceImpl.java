package de.hnnsb.timetrackerservice.tasks;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getTasksByEmail(String email) {
        log.info("Getting tasks");
        return taskRepository.findByEmail(email);
    }

    @Override
    public Task createTask(Task task) {
        log.info("Creating task: " + task);
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(UUID id) {
        log.info("Deleting task with id: " + id);
        taskRepository.deleteById(id);
    }

    @Override
    public Task updateTask(Task task) {
        if (taskRepository.existsById(task.getId())) {
            log.info("Updating task: " + task);
        } else {
            log.warn("Creating task on update: " + task);
        }
        return taskRepository.save(task);
    }

    @Override
    public Task getTask(UUID id) {
        return taskRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }
}