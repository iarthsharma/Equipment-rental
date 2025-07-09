package com.example.rental.repository;

import com.example.rental.model.Equipment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends MongoRepository<Equipment, String> {

    // Find equipment by category
    List<Equipment> findByCategory(String category);

    // Find equipment by availability
    List<Equipment> findByAvailable(boolean available);

    // Find equipment by name (case-insensitive)
    List<Equipment> findByNameIgnoreCase(String name);

    // Find all equipment with rental price less than or equal to a value
    List<Equipment> findByRentalPricePerDayLessThanEqual(double price);

    // (Optional) Find equipment by category and availability
    List<Equipment> findByCategoryAndAvailable(String category, boolean available);
}
