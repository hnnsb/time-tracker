package de.hnnsb.timetrackerservice.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable UUID id) {
        try {
            var res = taskService.getTask(id);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(@RequestParam String email) {
        var res = taskService.getTasksByEmail(email);
        return ResponseEntity.ok(res);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        var res = taskService.createTask(task);
        try {
            var location = new URI("/api/tasks/" + res.getId());
            return ResponseEntity.created(location).body(res);
        } catch (URISyntaxException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        var res = taskService.updateTask(task);
        return ResponseEntity.ok(res);
    }
}