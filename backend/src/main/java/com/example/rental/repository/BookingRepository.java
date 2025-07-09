package com.example.rental.repository;

import com.example.rental.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {

    // Find bookings by user ID
    List<Booking> findByUserId(String userId);

    // Find bookings for a specific equipment
    List<Booking> findByEquipmentId(String equipmentId);

    // Find bookings for equipment within a date range (for conflict checks)
    List<Booking> findByEquipmentIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
        String equipmentId, LocalDate endDate, LocalDate startDate);

    // Find bookings by status (e.g., pending, approved)
    List<Booking> findByStatus(String status);

    // Find all bookings for reporting/admin
    List<Booking> findAll();
}
List<Booking> findByUserId(String userId){
    
}