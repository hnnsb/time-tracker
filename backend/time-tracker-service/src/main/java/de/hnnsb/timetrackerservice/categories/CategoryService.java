package de.hnnsb.timetrackerservice.categories;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    List<Category> getCategoriesByEmail(String email);

    Category createCategory(Category category);

    void deleteCategory(UUID id);

    Category updateCategory(Category category);

    Category getCategory(UUID id);
}
