package com.example.rental.service;

import com.example.rental.model.Booking;
import com.example.rental.model.BookingStatus;
import com.example.rental.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class ConflictResolver {

    @Autowired
    private BookingRepository bookingRepository;

    /**
     * Checks if the proposed booking for a given equipment and date range conflicts
     * with any existing APPROVED or PENDING bookings.
     *
     * @param equipmentId ID of the equipment to check
     * @param startDate   Proposed booking start date
     * @param endDate     Proposed booking end date
     * @return true if a conflict exists, false otherwise
     */
    public boolean hasConflict(String equipmentId, LocalDate startDate, LocalDate endDate) {
        List<Booking> overlappingBookings =
                bookingRepository.findByEquipmentIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                        equipmentId, endDate, startDate);

        return overlappingBookings.stream()
                .anyMatch(b -> b.getStatus() == BookingStatus.APPROVED ||
                               b.getStatus() == BookingStatus.PENDING);
    }
}
