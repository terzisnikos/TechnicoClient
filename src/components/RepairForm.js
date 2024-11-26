import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRepairById, createRepair, updateRepair } from "../services/api";

const RepairForm = () => {
  const { id } = useParams(); // Get the repair ID from the URL
  const navigate = useNavigate();

  // State to manage form data
  const [repair, setRepair] = useState({
    type: "",
    description: "",
    propertyItemId: "",
    address: "", // Include Address field
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Fetch repair details if editing
  useEffect(() => {
    if (id) {
      fetchRepairById(id).then((response) => {
        const { type, description, PropertyItemId, address } = response.data;
        setRepair({
          type,
          description,
          propertyItemId: PropertyItemId,
          address,
        });
      });
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepair({ ...repair, [name]: value });
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!repair.type) newErrors.type = "Type is required";
    if (!repair.propertyItemId)
      newErrors.propertyItemId = "Property Item ID is required";
    if (!repair.address) newErrors.address = "Address is required"; // Validate Address
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validate()) return;

    const apiCall = id
      ? updateRepair(id, repair) // Update existing repair
      : createRepair(repair); // Create new repair

    apiCall
      .then(() => navigate("/repairs"))
      .catch((error) => {
        console.error("Failed to save repair:", error);
      });
  };

  return (
    <form>
      <TextField
        label="Type"
        name="type"
        value={repair.type}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        error={!!errors.type}
        helperText={errors.type}
      />
      <TextField
        label="Description"
        name="description"
        value={repair.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Property Item ID"
        name="propertyItemId"
        value={repair.propertyItemId}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        error={!!errors.propertyItemId}
        helperText={errors.propertyItemId}
      />
      <TextField
        label="Address"
        name="address"
        value={repair.address}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        error={!!errors.address}
        helperText={errors.address}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        style={{ marginTop: "16px" }}
      >
        {id ? "Update Repair" : "Create Repair"}
      </Button>
    </form>
  );
};

export default RepairForm;
