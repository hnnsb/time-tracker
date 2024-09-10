package de.hnnsb.timetrackerservice.categories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getTask(@PathVariable UUID id) {
        try {
            var res = categoryService.getCategory(id);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Category>> getCategories(@RequestParam String email) {
        var res = categoryService.getCategoriesByEmail(email);
        return ResponseEntity.ok(res);
    }

    @PostMapping
    public ResponseEntity<Category> createTask(@RequestBody Category category) {
        var res = categoryService.createCategory(category);
        try {
            var location = new URI("/api/tasks/" + res.getId());
            return ResponseEntity.created(location).body(res);
        } catch (URISyntaxException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<Category> updateTask(@RequestBody Category category) {
        var res = categoryService.updateCategory(category);
        return ResponseEntity.ok(res);
    }
}
