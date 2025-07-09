package com.example.rental.service;

import com.example.rental.model.Equipment;
import com.example.rental.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    // Retrieve all equipment items
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    // Retrieve equipment by ID
    public Equipment getEquipmentById(String id) {
        Optional<Equipment> equipmentOpt = equipmentRepository.findById(id);
        return equipmentOpt.orElse(null);
    }

    // Add a new equipment item
    public Equipment addEquipment(Equipment equipment) {
        equipment.setAvailable(true); // New equipment is available by default
        return equipmentRepository.save(equipment);
    }

    // Update an existing equipment item
    public Equipment updateEquipment(String id, Equipment updatedEquipment) {
        Optional<Equipment> equipmentOpt = equipmentRepository.findById(id);
        if (equipmentOpt.isPresent()) {
            Equipment equipment = equipmentOpt.get();
            equipment.setName(updatedEquipment.getName());
            equipment.setDescription(updatedEquipment.getDescription());
            equipment.setCategory(updatedEquipment.getCategory());
            equipment.setAvailable(updatedEquipment.isAvailable());
            equipment.setRentalPricePerDay(updatedEquipment.getRentalPricePerDay());
            equipment.setImageUrl(updatedEquipment.getImageUrl());
            return equipmentRepository.save(equipment);
        }
        return null;
    }

    // Delete an equipment item
    public boolean deleteEquipment(String id) {
        if (equipmentRepository.existsById(id)) {
            equipmentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // (Optional) Retrieve equipment by category
    public List<Equipment> getEquipmentByCategory(String category) {
        return equipmentRepository.findByCategory(category);
    }

    // (Optional) Retrieve equipment by availability
    public List<Equipment> getAvailableEquipment() {
        return equipmentRepository.findByAvailable(true);
    }
}
