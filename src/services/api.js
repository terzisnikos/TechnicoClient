import axios from "axios";

// Base URL for the backend
const apiUrl = "https://localhost:7004"; // Assuming backend is running on localhost:8080

const api = axios.create({
  baseURL: apiUrl,
});

// CRUD Functions for Owners
export const fetchOwners = () => api.get("/api/Owners");
export const fetchOwnerById = (id) => api.get(`/api/Owners/${id}`);
export const createOwner = (data) => api.post("/api/Owners", data);
export const updateOwner = (id, data) => api.put(`/api/Owners/${id}`, data);
export const deleteOwner = (id) => api.delete(`/api/Owners/${id}`);

// CRUD Functions for PropertyItems
export const fetchPropertyItems = () => api.get("/api/ProperyItems");
export const fetchPropertyItemById = (id) => api.get(`/api/ProperyItems/${id}`);
export const createPropertyItem = (data) => api.post("/api/ProperyItems", data);
export const updatePropertyItem = (id, data) =>
  api.put(`/api/ProperyItems/${id}`, data);
export const deletePropertyItem = (id) => api.delete(`/api/ProperyItems/${id}`);
export const fetchPropertyItemsByOwnerId = (id) =>
  api.get(`/api/ProperyItems/owner/${id}`);

// CRUD Functions for Repairs
export const fetchRepairs = () => api.get("/api/Repair");
export const fetchRepairById = (id) => api.get(`/api/Repair/${id}`);
export const createRepair = (data) => api.post("/api/Repair", data);
export const updateRepair = (id, data) => api.put(`/api/Repair/${id}`, data);
export const deleteRepair = (id) => api.delete(`/api/Repair/${id}`);
export const fetchRepairsByPropertyItemId = (id) =>
  api.get(`/api/Repair/propertyItem/${id}`);

console.log(api);
export default api;
