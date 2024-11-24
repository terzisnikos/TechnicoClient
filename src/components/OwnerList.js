import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchOwners, deleteOwner } from '../services/api'; // Import the API functions

const OwnerList = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetchOwners().then((response) => setOwners(response.data)); // Use fetchOwners to get data
  }, []);

  const handleDelete = (id) => {
    deleteOwner(id).then(() => {
      setOwners(owners.filter(owner => owner.id !== id)); // Remove the deleted owner from the list
    });
  };

  return (
    <>
      <Button variant="contained" color="primary" component={Link} to="/owners/new">Add Owner</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {owners.map(owner => (
            <TableRow key={owner.id}>
              <TableCell>{owner.id}</TableCell>
              <TableCell>{owner.name}</TableCell>
              <TableCell>{owner.email}</TableCell>
              <TableCell>
                <Button component={Link} to={`/owners/${owner.id}`}>Edit</Button>
                <Button color="secondary" onClick={() => handleDelete(owner.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default OwnerList;
