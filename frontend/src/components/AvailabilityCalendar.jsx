import React, { useEffect, useState } from "react";
import axios from "axios";

const AvailabilityCalendar = ({ equipmentId }) => {
  const [bookings, setBookings] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [equipmentId]);

  useEffect(() => {
    generateCalendar();
  }, [bookings, currentMonth]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`/api/booking/equipment/${equipmentId}`);
      setBookings(response.data);
    } catch (error) {
      setBookings([]);
    }
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);
      const isBooked = bookings.some((booking) => {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);
        return date >= start && date <= end && (booking.status === "APPROVED" || booking.status === "PENDING");
      });
      days.push({ date, isBooked });
    }
    setCalendarDays(days);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div>
      <h3>Availability Calendar</h3>
      <div>
        <button onClick={handlePrevMonth}>Previous</button>
        <span>
          {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            const rows = [];
            let cells = [];
            const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
            // Fill initial empty cells
            for (let i = 0; i < firstDayOfWeek; i++) {
              cells.push(<td key={`empty-start-${i}`}></td>);
            }
            calendarDays.forEach((day, idx) => {
              cells.push(
                <td
                  key={day.date.toISOString()}
                  style={{
                    backgroundColor: day.isBooked ? "#f8d7da" : "#d4edda",
                    color: day.isBooked ? "#721c24" : "#155724",
                  }}
                >
                  {day.date.getDate()}
                </td>
              );
              if ((cells.length) % 7 === 0) {
                rows.push(<tr key={`row-${idx}`}>{cells}</tr>);
                cells = [];
              }
            });
            // Fill trailing empty cells
            if (cells.length > 0) {
              for (let i = cells.length; i < 7; i++) {
                cells.push(<td key={`empty-end-${i}`}></td>);
              }
              rows.push(<tr key="last-row">{cells}</tr>);
            }
            return rows;
          })()}
        </tbody>
      </table>
      <div style={{ marginTop: "8px" }}>
        <span style={{ background: "#d4edda", color: "#155724", padding: "2px 6px", marginRight: "10px" }}>Available</span>
        <span style={{ background: "#f8d7da", color: "#721c24", padding: "2px 6px" }}>Booked</span>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;