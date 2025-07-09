import React, { useState } from "react";
import axios from "axios";
// If using a date picker library, import it here
// import DatePicker from "react-date-picker";

const BookingForm = ({ equipmentId, onBookingSuccess }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const bookingData = {
        equipmentId,
        // You may want to fetch userId from context or authentication
        startDate,
        endDate,
        depositAmount: parseFloat(depositAmount),
      };
      const response = await axios.post("/api/booking", bookingData);
      setSuccess("Booking request submitted!");
      setStartDate("");
      setEndDate("");
      setDepositAmount("");
      if (onBookingSuccess) onBookingSuccess(response.data);
    } catch (err) {
      setError(
        err.response?.data || "Failed to submit booking. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Equipment</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}

      {/* Date pickers can be replaced with a library for better UX */}
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Deposit Amount:</label>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </button>
    </form>
  );
};

export default BookingForm;