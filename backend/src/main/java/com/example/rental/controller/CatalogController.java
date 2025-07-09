package com.example.rental.controller;

import com.example.rental.model.Equipment;
import com.example.rental.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

    // Get all equipment
    @GetMapping("/equipment")
    public ResponseEntity<List<Equipment>> getAllEquipment() {
        List<Equipment> equipmentList = catalogService.getAllEquipment();
        return ResponseEntity.<List<Equipment>>ok(equipmentList);
    }

    // Get equipment by ID
    @GetMapping("/equipment/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable String id) {
        Equipment equipment = catalogService.getEquipmentById(id);
        if (equipment != null) {
            return ResponseEntity.ok(equipment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Add new equipment (admin only)
    @PostMapping("/equipment")
    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment) {
        Equipment created = catalogService.addEquipment(equipment);
        return ResponseEntity.ok(created);
    }

    // Update equipment (admin only)
    @PutMapping("/equipment/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable String id, @RequestBody Equipment equipment) {
        Equipment updated = catalogService.updateEquipment(id, equipment);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete equipment (admin only)
    @DeleteMapping("/equipment/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable String id) {
        boolean deleted = catalogService.deleteEquipment(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
