import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import BookingPage from "./pages/BookingPage";
import AdminPage from "./pages/AdminPage";
// import LoginPage from "./pages/LoginPage"; // If you have authentication
// import NotFoundPage from "./pages/NotFoundPage"; // Optional: custom 404 page

const App = () => {
  return (
    <Router>
      <div style={styles.appContainer}>
        <header style={styles.header}>
          <h1>Online Equipment Rental System</h1>
          {/* Add navigation links here if needed */}
        </header>
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Navigate to="/catalog" />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/booking/:equipmentId" element={<BookingPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        <footer style={styles.footer}>
          &copy; {new Date().getFullYear()} Equipment Rental System
        </footer>
      </div>
    </Router>
  );
};

const styles = {
  appContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f5f5f5",
  },
  header: {
    background: "#1976d2",
    color: "#fff",
    padding: "16px",
    textAlign: "center",
  },
  main: {
    flex: 1,
    padding: "24px",
  },
  footer: {
    background: "#222",
    color: "#fff",
    textAlign: "center",
    padding: "12px 0",
  },
};

export default App;
