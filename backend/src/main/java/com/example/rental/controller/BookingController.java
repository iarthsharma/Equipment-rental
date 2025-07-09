package com.example.rental.controller;

import com.example.rental.model.Booking;
import com.example.rental.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Get all bookings (admin or for reporting)
    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.<List<Booking>>ok(bookings);
    }

    // Get bookings for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable String userId) {
        List<Booking> bookings = bookingService.getBookingsByUser(userId);
        return ResponseEntity.<List<Booking>>ok(bookings);
    }

    // Get booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable String id) {
        Booking booking = bookingService.getBookingById(id);
        if (booking != null) {
            return ResponseEntity.ok(booking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create a new booking (checks for conflicts)
    @PostMapping("")
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        boolean conflict = bookingService.hasConflict(booking);
        if (conflict) {
            return ResponseEntity.badRequest().body("Booking conflict detected for selected equipment and dates.");
        }
        Booking created = bookingService.createBooking(booking);
        return ResponseEntity.ok(created);
    }

    // Update a booking (e.g., change dates)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable String id, @RequestBody Booking booking) {
        boolean conflict = bookingService.hasConflict(booking);
        if (conflict) {
            return ResponseEntity.badRequest().body("Booking conflict detected for selected equipment and dates.");
        }
        Booking updated = bookingService.updateBooking(id, booking);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Cancel a booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(@PathVariable String id) {
        boolean cancelled = bookingService.cancelBooking(id);
        if (cancelled) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
