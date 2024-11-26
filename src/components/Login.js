import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Use Axios for API calls

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
  const handleSubmit = async () => {
    console.log("credentials are", credentials);
    console.log("props.currentOwner.name is", props.currentOwner.name);
    console.log("props.currentOwner.password is", props.currentOwner.password);
    setError(null); // Clear previous errors
    // Validate inputs
    /* if (!credentials.name || !credentials.password) {
      console.log("credentials are", credentials);
      console.log("props.currentOwner.name is", props.currentOwner.name);
      console.log(
        "props.currentOwner.password is",
        props.currentOwner.password
      );
      setError("Both name and password are required.");
      return;
    }*/

    if (
      props.currentOwner.name == credentials.name &&
      props.currentOwner.password == credentials.password
    ) {
      if (props.currentOwner.type === "admin") {
        navigate("/owners");
      } else {
        navigate("/property-items");
      }
    } else {
      setError("Invalid name or password.");
    }

    /*   try {
      // Send login request to the backend
        const response = await axios.post(
        "http://localhost:7004/api/owners",
        credentials
      );

      if (response.status === 200) {
        // Redirect to /owners on successful login
        navigate("/owners");
      }
    } catch (err) {
      // Handle errors from the backend
      if (err.response && err.response.status === 401) {
        setError("Invalid name or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }*/
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Owner Login</h2>
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
    </div>
  );
};

export default OwnerLogin;
