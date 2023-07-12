package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.services.TrashService;

@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("trash")
public class TrashController {
    private final TrashService trashService;

    public TrashController(TrashService trashService) {
        this.trashService = trashService;
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        log.info("Удаление задачи с id: {}", taskId);
        boolean isDeleted = trashService.deleteTaskById(taskId);
        if (isDeleted) {
            log.info("Задача успешно удалена");

            return ResponseEntity.noContent().build();
        } else {
            log.info("Задача не была удалена");

            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/restore/{taskId}")
    public ResponseEntity<String> restoreFromTrash(@PathVariable Long taskId) {
        trashService.restoreFromTrash(taskId);
        return ResponseEntity.ok("Задача восстановлена из корзины");
    }
}
