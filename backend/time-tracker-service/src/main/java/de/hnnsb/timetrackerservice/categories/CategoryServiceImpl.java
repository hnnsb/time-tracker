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
        log.info("Getting categories");
        return categoryRepository.findByEmail(email);
    }

    @Override
    public Category createCategory(Category category) {
        log.info("Creating category: " + category);
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(UUID id) {
        log.info("Deleting category with id: " + id);
        categoryRepository.deleteById(id);
    }

    @Override
    public Category updateCategory(Category category) {
        if (categoryRepository.existsById(category.getId())) {
            log.info("Updating category: " + category);
        } else {
            log.warn("Creating category on update: " + category);
        }
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategory(UUID id) {
        return categoryRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }
}
