package com.example.rental.service;

import com.example.rental.model.Booking;
import com.example.rental.model.BookingStatus;
import com.example.rental.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Retrieve all bookings (for admin/reporting)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Retrieve bookings for a specific user
    public List<Booking> getBookingsByUser(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    // Retrieve a booking by ID
    public Booking getBookingById(String bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        return bookingOpt.orElse(null);
    }

    // Create a new booking (with conflict check)
    public Booking createBooking(Booking booking) {
        booking.setStatus(BookingStatus.PENDING);
        booking.setCreatedAt(LocalDate.now());
        booking.setUpdatedAt(LocalDate.now());
        return bookingRepository.save(booking);
    }

    // Update an existing booking (with conflict check)
    public Booking updateBooking(String bookingId, Booking updatedBooking) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStartDate(updatedBooking.getStartDate());
            booking.setEndDate(updatedBooking.getEndDate());
            booking.setDepositAmount(updatedBooking.getDepositAmount());
            booking.setDepositPaid(updatedBooking.isDepositPaid());
            booking.setUpdatedAt(LocalDate.now());
            return bookingRepository.save(booking);
        }
        return null;
    }

    // Cancel a booking
    public boolean cancelBooking(String bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStatus(BookingStatus.CANCELLED);
            booking.setUpdatedAt(LocalDate.now());
            bookingRepository.save(booking);
            return true;
        }
        return false;
    }

    // Check for booking conflicts (overlapping dates for the same equipment)
    public boolean hasConflict(Booking booking) {
        List<Booking> conflictingBookings = bookingRepository
            .findByEquipmentIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                booking.getEquipmentId(),
                booking.getEndDate(),
                booking.getStartDate()
            );
        // Exclude bookings that are cancelled or rejected
        return conflictingBookings.stream()
                .anyMatch(b -> b.getStatus() == BookingStatus.APPROVED || b.getStatus() == BookingStatus.PENDING);
    }
}
