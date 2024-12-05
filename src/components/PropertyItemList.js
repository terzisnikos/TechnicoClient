import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchPropertyItems, deletePropertyItem } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PropertyItemList = (props) => {
  const [propertyItems, setPropertyItems] = useState([]);
  const [filter, setFilter] = useState(""); // State for filtering by address

  useEffect(() => {
    fetchPropertyItems()
      .then((response) => setPropertyItems(response.data)) // Fetch property items
      .catch(() => toast.error("Failed to fetch property items!")); // Notify on fetch error
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePropertyItem(id); // Attempt to delete the property item
      setPropertyItems(propertyItems.filter((item) => item.id !== id)); // Remove deleted property item
      toast.success("Property item deleted successfully!"); // Notify on success
    } catch (error) {
      toast.error(
        "Failed to delete property item. Please try to delete the depended Repairs first."
      ); // Notify on error
    }
  };

  // Filter property items based on the Address or Owner Name
  const filteredPropertyItems = propertyItems.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) || // Match Address
      item.ownerName.toLowerCase().includes(filter.toLowerCase()) // Match Owner Name
  );

  return (
    <>
      <ToastContainer />
      <Button
        sx={{ mt: 5, mb: 2 }}
        variant="contained"
        color="primary"
        component={Link}
        to="/property-items/new"
      >
        Add Property Item
      </Button>
      {/* Generic Filter */}
      <TextField
        sx={{ mb: 5, mt: 5, ml: 5 }}
        label="Filter by Address or Owner Name"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Owner Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPropertyItems.map((item, index) => (
            <TableRow key={item.id}>
              {/* Display the row number starting from 1 */}
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.ownerName}</TableCell>
              <TableCell>
                <Button component={Link} to={`/property-items/${item.id}`}>
                  Edit
                </Button>
                <Button color="secondary" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PropertyItemList;
