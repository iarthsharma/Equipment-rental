package com.example.rental.service;

import com.example.rental.model.Booking;
import com.example.rental.model.BookingStatus;
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

    public void approveBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking != null) {
            booking.setStatus(BookingStatus.APPROVED);
            bookingRepository.save(booking);
        }
    }

    public void rejectBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking != null) {
            booking.setStatus(BookingStatus.REJECTED);
            bookingRepository.save(booking);
        }
    }

    public List<Booking> getPendingBookings() {
        return bookingRepository.findByStatus(BookingStatus.PENDING);
    }
}