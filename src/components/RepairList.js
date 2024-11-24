import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchRepairs, deleteRepair } from '../services/api'; // API functions for repairs

const RepairList = () => {
  const [repairs, setRepairs] = useState([]);

  // Fetch all repairs when the component loads
  useEffect(() => {
    fetchRepairs().then((response) => setRepairs(response.data)); // Fetch all repairs
  }, []);

  // Handle deletion of a repair
  const handleDelete = (id) => {
    deleteRepair(id).then(() => {
      setRepairs(repairs.filter((repair) => repair.id !== id)); // Update the list after deletion
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/repairs/new"
        style={{ marginBottom: '16px' }}
      >
        Add Repair
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Property Item ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repairs.map((repair) => (
            <TableRow key={repair.id}>
              <TableCell>{repair.id}</TableCell>
              <TableCell>{repair.type}</TableCell>
              <TableCell>{repair.description}</TableCell>
              <TableCell>{repair.propertyItemId}</TableCell>
              <TableCell>
                <Button component={Link} to={`/repairs/${repair.id}`} color="primary">
                  Edit
                </Button>
                <Button color="secondary" onClick={() => handleDelete(repair.id)}>
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
