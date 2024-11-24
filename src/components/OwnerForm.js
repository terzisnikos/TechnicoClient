import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOwnerById, createOwner, updateOwner } from '../services/api'; // Import necessary API functions

const OwnerForm = () => {
  const { id } = useParams(); // Retrieve the owner ID from the URL
  const navigate = useNavigate();

  // State for owner fields
  const [owner, setOwner] = useState({
    id: null, // Initialize as null, explicitly handle it as a long if provided
    vatNumber: '',
    name: '',
    surname: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
    ownerType: '',
    propertyItems: [], // Handle this separately if needed
  });

  // Load owner data if editing
  useEffect(() => {
    if (id) {
      fetchOwnerById(Number(id)) // Ensure the ID is converted to a number (long)
        .then((response) => {
          setOwner(response.data); // Populate the form with the fetched data
        });
    }
  }, [id]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner({ ...owner, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    const apiCall = id
      ? updateOwner(Number(id), owner) // Use `updateOwner` for existing owner, ensure ID is treated as a number
      : createOwner(owner); // Use `createOwner` for a new owner
    apiCall.then(() => navigate('/owners')); // Redirect to owners list after submission
  };

  return (
    <form>
      <TextField
        label="VAT Number"
        name="vatNumber"
        value={owner.vatNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        name="name"
        value={owner.name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Surname"
        name="surname"
        value={owner.surname}
        onChange={handleChange}
        required
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
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={owner.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={owner.password}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Owner Type"
        name="ownerType"
        value={owner.ownerType}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Individual">Individual</MenuItem>
        <MenuItem value="Company">Company</MenuItem>
      </TextField>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        style={{ marginTop: '16px' }}
      >
        {id ? 'Update Owner' : 'Create Owner'}
      </Button>
    </form>
  );
};

export default OwnerForm;
