import React, { useEffect, useState } from "react";
import axios from "axios";
import EquipmentCard from "./components/EquipmentCard";
import AvailabilityCalendar from "./components/AvailabilityCalendar";
import BookingForm from "./components/BookingForm";

const BookingPage = ({ equipmentId }) => {
  const [equipment, setEquipment] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  useEffect(() => {
    fetchEquipment();
  }, [equipmentId]);

  const fetchEquipment = async () => {
    try {
      const response = await axios.get(`/api/catalog/equipment/${equipmentId}`);
      setEquipment(response.data);
    } catch (error) {
      setEquipment(null);
    }
  };

  const handleBookingSuccess = (booking) => {
    setBookingSuccess(booking);
  };

  if (!equipment) {
    return <div>Loading equipment details...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Book Equipment</h1>
      <div style={styles.detailsSection}>
        <EquipmentCard equipment={equipment} onViewDetails={() => {}} onBook={() => {}} />
      </div>
      <div style={styles.calendarSection}>
        <AvailabilityCalendar equipmentId={equipment.id} />
      </div>
      <div style={styles.formSection}>
        <BookingForm equipmentId={equipment.id} onBookingSuccess={handleBookingSuccess} />
        {bookingSuccess && (
          <div style={{ color: "green", marginTop: "16px" }}>
            Booking successful! Booking ID: {bookingSuccess.id}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "24px",
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  detailsSection: {
    marginBottom: "24px",
  },
  calendarSection: {
    marginBottom: "24px",
  },
  formSection: {
    marginBottom: "24px",
    background: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
};

export default BookingPage;
