import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OwnerLogin = (props) => {
  const navigate = useNavigate();

  // State to manage login credentials and errors
  const [credentials, setCredentials] = useState({
    name: "admin",
    password: "password",
  });
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    setError(null); // Clear previous errors

    if (
      props.currentOwner.name === credentials.name &&
      props.currentOwner.password === credentials.password
    ) {
      if (props.currentOwner.type === "admin") {
        navigate("/owners");
      } else {
        navigate("/property-items");
      }
    } else {
      setError("Invalid name or password.");
    }
  };

  return (
    <>
      <div
        style={{
          maxWidth: 400,
          margin: "50px auto",
          textAlign: "center",
          marginTop: "200px",
          padding: "16px",
          border: "1px solid #ccc",
        }}
      >
        <h1>Technico</h1>
        <h2>Login</h2>
        {error && (
          <Alert severity="error" style={{ marginBottom: "16px" }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Name"
          name="name"
          value={credentials.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
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
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/register")}
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Register
        </Button>
      </div>
    </>
  );
};

export default OwnerLogin;
