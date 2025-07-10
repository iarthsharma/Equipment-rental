package com.example.rental.controller;

import com.example.rental.model.Booking;
import com.example.rental.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Get all pending bookings for approval
    @GetMapping("/bookings/pending")
    public ResponseEntity<List<Booking>> getPendingBookings() {
        List<Booking> pendingBookings = adminService.getPendingBookings();
        return ResponseEntity.ok(pendingBookings);
    }

    // Approve a booking by ID
    @PostMapping("/bookings/{id}/approve")
    public ResponseEntity<Booking> approveBooking(@PathVariable String id) {
        Booking approved = adminService.approveBooking(id);
        if (approved != null) {
            return ResponseEntity.ok(approved);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Reject a booking by ID
    @PostMapping("/bookings/{id}/reject")
    public ResponseEntity<Booking> rejectBooking(@PathVariable String id) {
        Booking rejected = adminService.rejectBooking(id);
        if (rejected != null) {
            return ResponseEntity.ok(rejected);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @

    // (Optional) Get all users (admin management)
    // @GetMapping("/users")
    // public ResponseEntity<List<User>> getAllUsers() {
    //     List<User> users = adminService.getAllUsers();
    //     return ResponseEntity.ok(users);
    // }
}
