// src/services/EquipmentService.js
import { get, post, put, del } from "./api";

// Fetch all equipment items
export const fetchAllEquipment = () => get("/api/catalog/equipment");

// Fetch a single equipment item by ID
export const fetchEquipmentById = (equipmentId) => get(`/api/catalog/equipment/${equipmentId}`);

// Add a new equipment item (admin only)
export const addEquipment = (equipmentData) => post("/api/catalog/equipment", equipmentData);

// Update an existing equipment item (admin only)
export const updateEquipment = (equipmentId, equipmentData) =>
  put(`/api/catalog/equipment/${equipmentId}`, equipmentData);

// Delete an equipment item (admin only)
export const deleteEquipment = (equipmentId) => del(`/api/catalog/equipment/${equipmentId}`);

// (Optional) Fetch equipment by category
export const fetchEquipmentByCategory = (category) =>
  get(`/api/catalog/equipment?category=${encodeURIComponent(category)}`);

// (Optional) Fetch available equipment
export const fetchAvailableEquipment = () =>
  get("/api/catalog/equipment?available=true");
