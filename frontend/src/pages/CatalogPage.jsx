import React, { useEffect, useState } from "react";
import axios from "axios";
import EquipmentCard from "./components/EquipmentCard";

const CatalogPage = ({ onViewDetails, onBook }) => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Optional: Add state for search/filter if needed

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/catalog/equipment");
      setEquipmentList(response.data);
    } catch (err) {
      setError("Failed to load equipment catalog.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>Equipment Catalog</h1>
      {/* Optional: Add search/filter UI here */}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <div>Loading equipment...</div>
      ) : equipmentList.length === 0 ? (
        <div>No equipment found.</div>
      ) : (
        <div style={styles.grid}>
          {equipmentList.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              onViewDetails={onViewDetails}
              onBook={onBook}
            />
          ))}
        </div>
      )}
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
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "flex-start",
  },
};

export default CatalogPage;