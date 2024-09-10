package de.hnnsb.timetrackerservice.categories;

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
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    @Override
    public List<Category> getCategoriesByEmail(String email) {
        log.info("Getting categories for {}", email);
        return categoryRepository.findByEmail(email);
    }

    @Override
    public Category createCategory(Category category) {
        category = categoryRepository.save(category);
        log.info("Created category: {}", category.getId());
        return category;
    }

    @Override
    public void deleteCategory(UUID id) {
        log.info("Deleting category: {}", id);
        categoryRepository.deleteById(id);
    }

    @Override
    public Category updateCategory(Category category) {
        if (categoryRepository.existsById(category.getId())) {
            log.info("Updating category: {}", category.getId());
        } else {
            log.warn("Creating category on update: {}", category.getId());
        }
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategory(UUID id) {
        log.info("Getting category: {}", id);
        return categoryRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }
}
