package de.hnnsb.timetrackerservice.tasks;

import de.hnnsb.timetrackerservice.categories.Category;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String description;
    private Date startTime;
    private Date endTime;
    private String email;
    private int pauseTime;
    private Date pauseStart;
    @ManyToOne
    private Category category;
}
