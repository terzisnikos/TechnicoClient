import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; // Ensure useParams is imported correctly
import { createOwner, updateOwner, fetchOwnerById } from "../services/api"; // API functions

const OwnerForm = ({ isEditing }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Move useParams to the top level of the component

  // State for owner form data
  const [owner, setOwner] = useState({
    name: "",
    surname: "",
    vatNumber: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    ownerType: "user", // Default value
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && id) {
      fetchOwnerById(id)
        .then((response) => {
          const {
            name,
            surname,
            vatNumber,
            address,
            phoneNumber,
            email,
            password,
            ownerType,
          } = response.data;
          setOwner({
            name,
            surname,
            vatNumber,
            address,
            phoneNumber,
            email,
            password,
            ownerType,
          });
        })
        .catch((error) => {
          console.error("Failed to fetch owner by ID:", error);
        });
    }
  }, [isEditing, id]); // Dependency array includes `isEditing` and `id`

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner({ ...owner, [name]: value });
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!owner.name) newErrors.name = "Name is required";
    if (!owner.surname) newErrors.surname = "Surname is required";
    if (!owner.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!owner.email) newErrors.email = "Email is required";
    if (!owner.password && !isEditing)
      newErrors.password = "Password is required"; // Password is not mandatory when editing
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validate()) return;

    const action = isEditing
      ? updateOwner(id, owner) // Update owner if editing
      : createOwner(owner); // Create owner if not editing

    action
      .then(() => navigate("/owners")) // Redirect after successful action
      .catch((error) => {
        console.error("Failed to save owner:", error);
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors); // Handle backend validation errors
        }
      });
  };

  return (
    <form>
      <h3>{isEditing ? "Edit Owner" : "Add Owner"}</h3>
      <TextField
        label="Name"
        name="name"
        value={owner.name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Surname"
        name="surname"
        value={owner.surname}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        error={!!errors.surname}
        helperText={errors.surname}
      />
      <TextField
        label="VAT Number"
        name="vatNumber"
        value={owner.vatNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={owner.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={owner.phoneNumber}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
      />
      <TextField
        label="Email"
        name="email"
        value={owner.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={owner.password}
        onChange={handleChange}
        required={!isEditing}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        select
        label="Owner Type"
        name="ownerType"
        value={owner.ownerType || "user"}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="user">user</MenuItem>
        <MenuItem value="admin">admin</MenuItem>
      </TextField>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        style={{ marginTop: "16px" }}
      >
        {isEditing ? "Update Owner" : "Create Owner"}
      </Button>
    </form>
  );
};

export default OwnerForm;
