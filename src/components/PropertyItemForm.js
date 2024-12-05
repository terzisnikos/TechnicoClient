import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPropertyItemById,
  createPropertyItem,
  updatePropertyItem,
} from "../services/api"; // Correct imports
import axios from "axios"; // For fetching owners

const PropertyItemForm = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propertyItem, setPropertyItem] = useState({
    name: "",
    address: "",
    propertyIdentificationNumber: "",
    yearOfConstruction: "",
    vatNumber: "",
    ownerId: "",
  });
  const [owners, setOwners] = useState([]); // State to store owners

  // Fetch property item if editing
  useEffect(() => {
    if (id) {
      fetchPropertyItemById(id).then((response) => {
        setPropertyItem(response.data);
      });
    }
  }, [id]);

  // Fetch owners from API
  useEffect(() => {
    axios
      .get("https://localhost:7004/api/Owners") // Make GET request
      .then((response) => {
        setOwners(response.data); // Update owners state
      })
      .catch((error) => {
        console.error("Failed to fetch owners:", error);
      });
  }, []);

  const handleSubmit = () => {
    propertyItem.id = id; // Set property item ID for editing
    const action = props.isEditing
      ? updatePropertyItem(id, propertyItem) // Update logic
      : createPropertyItem(propertyItem); // Create logic

    action
      .then(() => {
        setTimeout(() => navigate("/property-items"), 0); // Redirect after 1.5 seconds
      })
      .catch((error) => {
        console.error("Failed to save property item:", error);
      });
  };

  // Ensure ownerId is set to '' if it doesn't match any owner id
  const isValidOwner = (ownerId) =>
    owners.some((owner) => owner.id === ownerId);

  return (
    <form>
      <TextField
        label="Property Identification Number"
        name="propertyIdentificationNumber"
        value={propertyItem.propertyIdentificationNumber}
        onChange={(e) =>
          setPropertyItem({
            ...propertyItem,
            [e.target.name]: e.target.value,
          })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        name="name"
        value={propertyItem.name}
        onChange={(e) =>
          setPropertyItem({ ...propertyItem, [e.target.name]: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={propertyItem.address}
        onChange={(e) =>
          setPropertyItem({ ...propertyItem, [e.target.name]: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Year of Construction"
        name="yearOfConstruction"
        value={propertyItem.yearOfConstruction}
        onChange={(e) =>
          setPropertyItem({ ...propertyItem, [e.target.name]: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="VAT Number"
        name="vatNumber"
        value={propertyItem.vatNumber}
        onChange={(e) =>
          setPropertyItem({ ...propertyItem, [e.target.name]: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="owner-select-label">Owner</InputLabel>
        <Select
          labelId="owner-select-label"
          name="ownerId"
          value={isValidOwner(propertyItem.ownerId) ? propertyItem.ownerId : ""} // Validate ownerId
          onChange={(e) =>
            setPropertyItem({ ...propertyItem, ownerId: e.target.value })
          }
        >
          <MenuItem value="">
            <em>None</em> {/* Option for no selection */}
          </MenuItem>
          {owners.map((owner) => (
            <MenuItem key={owner.id} value={owner.id}>
              {owner.surname} {/* Display surname */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default PropertyItemForm;
