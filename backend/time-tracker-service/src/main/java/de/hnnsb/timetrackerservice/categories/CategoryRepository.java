package de.hnnsb.timetrackerservice.categories;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends CrudRepository<Category, UUID> {
    List<Category> findByEmail(String email);
}
