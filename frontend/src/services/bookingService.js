// src/services/BookingService.js
import { get, post, put, del } from "./api";

// Fetch all bookings (admin/reporting)
export const fetchAllBookings = () => get("/api/booking/all");

// Fetch bookings for a specific user
export const fetchBookingsByUser = (userId) => get(`/api/booking/user/${userId}`);

// Fetch bookings for a specific equipment (for calendar/availability)
export const fetchBookingsByEquipment = (equipmentId) => get(`/api/booking/equipment/${equipmentId}`);

// Fetch a single booking by ID
export const fetchBookingById = (bookingId) => get(`/api/booking/${bookingId}`);

// Create a new booking
export const createBooking = (bookingData) => post("/api/booking", bookingData);

// Update an existing booking
export const updateBooking = (bookingId, bookingData) => put(`/api/booking/${bookingId}`, bookingData);

// Cancel (delete) a booking
export const cancelBooking = (bookingId) => del(`/api/booking/${bookingId}`);
