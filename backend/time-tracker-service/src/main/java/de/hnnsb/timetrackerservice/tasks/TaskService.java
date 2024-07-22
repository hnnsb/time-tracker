package de.hnnsb.timetrackerservice.tasks;

import java.util.List;
import java.util.UUID;

public interface TaskService {

    List<Task> getTasksByEmail(String email);

    Task createTask(Task task);

    void deleteTask(UUID id);

    Task updateTask(Task task);

    Task getTask(UUID id);
}
