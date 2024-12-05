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
import { fetchRepairs, deleteRepair } from "../services/api"; // API functions for repairs

const RepairList = (props) => {
  const [repairs, setRepairs] = useState([]);
  const [filter, setFilter] = useState(""); // State for filtering repairs

  // Fetch all repairs when the component loads
  useEffect(() => {
    if (props.currentUser) {
      console.log("Current User: ", props.currentUser);
    }
    fetchRepairs().then((response) => setRepairs(response.data)); // Fetch all repairs
  }, []);

  // Handle deletion of a repair
  const handleDelete = (id) => {
    deleteRepair(id).then(() => {
      setRepairs(repairs.filter((repair) => repair.id !== id)); // Update the list after deletion
    });
  };

  // Filter repairs based on Type, Property, or Owner Name
  const filteredRepairs = repairs.filter(
    (repair) =>
      repair.type.toLowerCase().includes(filter.toLowerCase()) || // Match Type
      repair.propertyItemTitle.toLowerCase().includes(filter.toLowerCase()) || // Match Property
      repair.ownerName.toLowerCase().includes(filter.toLowerCase()) // Match Owner Name
  );

  return (
    <>
      <Button
        sx={{ mt: 5, mb: 2 }}
        variant="contained"
        color="primary"
        component={Link}
        to="/repairs/new"
        style={{ marginBottom: "16px" }}
      >
        Add Repair
      </Button>

      {/* Filter Input */}
      <TextField
        sx={{ mb: 5, mt: 5, ml: 5 }}
        label="Filter by Type, Property, or Owner Name"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Scheduled Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Property</TableCell>
            <TableCell>Owner Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRepairs.map((repair) => (
            <TableRow key={repair.id}>
              <TableCell>{repair.id}</TableCell>
              <TableCell>{repair.type}</TableCell>
              <TableCell>{repair.scheduledDate}</TableCell>
              <TableCell>{repair.status}</TableCell>
              <TableCell>{repair.propertyItemTitle}</TableCell>
              <TableCell>{repair.ownerName}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={`/repairs/${repair.id}`}
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleDelete(repair.id)}
                >
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

export default RepairList;
