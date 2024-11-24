import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPropertyItemById, createPropertyItem, updatePropertyItem } from '../services/api'; // Correct imports

const PropertyItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propertyItem, setPropertyItem] = useState({ name: '', ownerId: '' });

  useEffect(() => {
    if (id) {
      fetchPropertyItemById(id).then((response) => setPropertyItem(response.data)); // Fetch item by ID
    }
  }, [id]);

  const handleSubmit = () => {
    const apiCall = id
      ? updatePropertyItem(id, propertyItem) // Update existing item
      : createPropertyItem(propertyItem); // Create new item
    apiCall.then(() => navigate('/property-items')); // Redirect after submission
  };

  return (
    <form>
      <TextField
        label="Name"
        name="name"
        value={propertyItem.name}
        onChange={(e) => setPropertyItem({ ...propertyItem, [e.target.name]: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Owner ID"
        name="ownerId"
       
        value={propertyItem.ownerId}
        onChange={(e) => setPropertyItem({ ...propertyItem, [e.target.name]: e.target.value })}
        fullWidth
        margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
    </form>
    );
}

export default PropertyItemForm;