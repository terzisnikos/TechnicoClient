import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchPropertyItems, deletePropertyItem } from "../services/api"; // Correct imports

const PropertyItemList = () => {
  const [propertyItems, setPropertyItems] = useState([]);

  useEffect(() => {
    fetchPropertyItems().then((response) => setPropertyItems(response.data)); // Fetch property items
  }, []);

  const handleDelete = (id) => {
    deletePropertyItem(id).then(() => {
      setPropertyItems(propertyItems.filter((item) => item.id !== id)); // Remove deleted property item
    });
  };

  return (
    <>
      <Button
        sx={{ mt: 5, mb: 2 }}
        variant="contained"
        color="primary"
        component={Link}
        to="/property-items/new"
      >
        Add Property Item
      </Button>
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
          {propertyItems.map((item, index) => (
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
