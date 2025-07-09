import React from "react";
import AdminApprovalPanel from "./components/AdminApprovalPanel";
// Import other admin components as needed

const AdminPage = () => {
  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      {/* Booking Approval Panel */}
      <section style={styles.section}>
        <AdminApprovalPanel />
      </section>
      {/* Future sections: User management, Equipment management, Reports, etc. */}
      {/* <section style={styles.section}>
        <UserManagementPanel />
      </section>
      <section style={styles.section}>
        <EquipmentManagementPanel />
      </section> */}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "24px",
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  section: {
    marginBottom: "32px",
    background: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
};

export default AdminPage;
