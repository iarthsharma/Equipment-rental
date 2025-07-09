import React from "react";

const EquipmentCard = ({ equipment, onViewDetails, onBook }) => {
  return (
    <div style={styles.card}>
      <img
        src={equipment.imageUrl || "/placeholder.png"}
        alt={equipment.name}
        style={styles.image}
      />
      <h3>{equipment.name}</h3>
      <p>{equipment.description}</p>
      <p>
        <strong>Category:</strong> {equipment.category}
      </p>
      <p>
        <strong>Price/Day:</strong> ₹{equipment.rentalPricePerDay}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span style={{ color: equipment.available ? "green" : "red" }}>
          {equipment.available ? "Available" : "Unavailable"}
        </span>
      </p>
      <div style={styles.actions}>
        <button onClick={() => onViewDetails(equipment.id)}>View Details</button>
        {equipment.available && (
          <button onClick={() => onBook(equipment.id)}>Book Now</button>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    width: "250px",
    margin: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    display: "inline-block",
    verticalAlign: "top",
    textAlign: "center",
    background: "#fff",
  },
  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "12px",
  },
  actions: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-around",
  },
};

export default EquipmentCard;
