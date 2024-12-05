import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios"; // Use Axios for API calls
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  // State to manage registration form inputs
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate inputs
    if (
      !formData.name ||
      !formData.surname ||
      !formData.password ||
      !formData.email ||
      !formData.phoneNumber
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      // Send registration request to the backend
      const response = await axios.post(
        "https://localhost:7004/api/Owners",
        formData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/owners"), 3000); // Redirect after 3 seconds
      }
    } catch (err) {
      // Handle errors from the backend
      if (err.response && err.response.data) {
        toast.error(
          err.response.data.message || "Registration failed. Please try again."
        );
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        textAlign: "center",
        padding: "16px",
        border: "1px solid #ccc",
      }}
    >
      <h1>Technico</h1>
      <h2>Register</h2>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Surname"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        style={{ marginTop: "16px" }}
      >
        Register
      </Button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UserRegistration;
