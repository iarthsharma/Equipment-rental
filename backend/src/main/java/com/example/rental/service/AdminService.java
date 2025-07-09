package com.example.rental.service;

import com.example.rental.model.Booking;
import com.example.rental.model.User;
import com.example.rental.repository.BookingRepository;
import com.example.rental.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public AdminService(UserRepository userRepository, BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long userId) {
        return userRepository.findByUserId(userId).orElse(null);
    }

    public void approveBooking(Long bookingId) {
        Booking booking = bookingRepository.findByUserId(bookingId).orElse(null);
        if (booking != null) {
            booking.setStatus("Approved");
            bookingRepository.save(booking);
        }
    }

    public void rejectBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking != null) {
            booking.setStatus("Rejected");
            bookingRepository.save(booking);
        }
    }
    public static void getPendingBookings() {
        // This method should return a list of pending bookings for admin approval
        // Implementation will depend on the BookingRepository methods available
        return bookingRepository.findByStatus("Pending");
    }
}