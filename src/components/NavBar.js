import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = (props) => (
  <AppBar position="static">
    <Toolbar>
      {props.currentOwner.type === "admin" ? (
        <Button color="inherit" component={Link} to="/owners">
          Owners
        </Button>
      ) : null}
      <Button color="inherit" component={Link} to="/property-items">
        Property Items
      </Button>
      <Button color="inherit" component={Link} to="/repairs">
        Repairs
      </Button>
    </Toolbar>
  </AppBar>
);

export default NavBar;
