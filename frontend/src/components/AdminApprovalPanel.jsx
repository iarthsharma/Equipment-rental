import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminApprovalPanel = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionStatus, setActionStatus] = useState("");

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/bookings/pending");
      setPendingBookings(response.data);
    } catch (error) {
      setActionStatus("Failed to fetch pending bookings.");
    }
    setLoading(false);
  };

  const handleApprove = async (bookingId) => {
    try {
      await axios.post(`/api/admin/bookings/${bookingId}/approve`);
      setActionStatus("Booking approved.");
      fetchPendingBookings();
    } catch (error) {
      setActionStatus("Failed to approve booking.");
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await axios.post(`/api/admin/bookings/${bookingId}/reject`);
      setActionStatus("Booking rejected.");
      fetchPendingBookings();
    } catch (error) {
      setActionStatus("Failed to reject booking.");
    }
  };

  return (
    <div>
      <h2>Pending Booking Approvals</h2>
      {actionStatus && <div style={{ color: "red" }}>{actionStatus}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : pendingBookings.length === 0 ? (
        <p>No pending bookings.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Equipment ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Deposit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.userId}</td>
                <td>{booking.equipmentId}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.depositAmount}</td>
                <td>{booking.status}</td>
                <td>
                  <button onClick={() => handleApprove(booking.id)}>
                    Approve
                  </button>
                  <button onClick={() => handleReject(booking.id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminApprovalPanel;