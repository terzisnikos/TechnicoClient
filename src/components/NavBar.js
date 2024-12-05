import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

const NavBar = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          {/* "Technico" Label */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Technico
          </Typography>

          {/* Navigation Buttons */}
          {props.currentOwner.type === "admin" && (
            <Button color="inherit" component={Link} to="/owners">
              Owners
            </Button>
          )}
          <Button color="inherit" component={Link} to="/property-items">
            Properties
          </Button>
          <Button color="inherit" component={Link} to="/repairs">
            Repairs
          </Button>

          {/* Logout Button */}
          <Box sx={{ marginLeft: "auto" }}>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
