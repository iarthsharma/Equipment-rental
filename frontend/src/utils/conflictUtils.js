// src/utils/conflictUtils.js

/**
 * Checks if the given date range overlaps with any existing bookings.
 *
 * @param {string} startDate - Proposed booking start date (YYYY-MM-DD)
 * @param {string} endDate - Proposed booking end date (YYYY-MM-DD)
 * @param {Array} bookings - Array of existing bookings with startDate, endDate, and status
 * @returns {boolean} - Returns true if a conflict exists, false otherwise
 */
export function hasBookingConflict(startDate, endDate, bookings) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return bookings.some((booking) => {
    // Only consider bookings that are APPROVED or PENDING
    if (booking.status !== "APPROVED" && booking.status !== "PENDING") return false;
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);

    // Check for overlapping ranges
    return (
      (start <= bookingEnd) &&
      (end >= bookingStart)
    );
  });
}

/**
 * Returns a list of dates that are booked (for use in calendar UIs).
 *
 * @param {Array} bookings - Array of bookings with startDate, endDate, and status
 * @returns {Set} - Set of booked date strings (YYYY-MM-DD)
 */
export function getBookedDates(bookings) {
  const bookedDates = new Set();

  bookings.forEach((booking) => {
    if (booking.status !== "APPROVED" && booking.status !== "PENDING") return;
    let current = new Date(booking.startDate);
    const end = new Date(booking.endDate);

    while (current <= end) {
      bookedDates.add(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
  });

  return bookedDates;
}
