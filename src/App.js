import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import OwnerList from "./components/OwnerList";
import OwnerForm from "./components/OwnerForm";
import PropertyItemList from "./components/PropertyItemList";
import PropertyItemForm from "./components/PropertyItemForm";
import RepairList from "./components/RepairList";
import RepairForm from "./components/RepairForm";
import Register from "./components/Register";
import Login from "./components/Login";
import { Container } from "@mui/material";

const currentOwner = {
  name: "admin",
  password: "password",
  type: "admin",
  //type: "user",
};

const App = () => {
  const location = useLocation(); // Get the current location

  const hideNavBarRoutes = ["/", "/logout"]; // Define routes where NavBar is hidden
  const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavBar && <NavBar currentOwner={currentOwner} />}
      <Container>
        <Routes>
          <Route path="/" element={<Login currentOwner={currentOwner} />} />
          <Route
            path="/logout"
            element={<Login currentOwner={currentOwner} />}
          />
          <Route
            path="/register"
            element={<Register currentOwner={currentOwner} />}
          />
          <Route
            path="/owners"
            element={
              <OwnerList currentOwner={currentOwner} isEditing={false} />
            }
          />
          <Route
            path="/owners/new"
            element={
              <OwnerForm currentOwner={currentOwner} isEditing={false} />
            }
          />
          <Route
            path="/owners/:id"
            element={<OwnerForm currentOwner={currentOwner} isEditing={true} />}
          />
          <Route
            path="/property-items"
            element={
              <PropertyItemList currentOwner={currentOwner} isEditing={false} />
            }
          />
          <Route
            path="/property-items/new"
            element={<PropertyItemForm currentOwner={currentOwner} />}
          />
          <Route
            path="/property-items/:id"
            element={
              <PropertyItemForm currentOwner={currentOwner} isEditing={true} />
            }
          />
          <Route
            path="/repairs"
            element={
              <RepairList currentOwner={currentOwner} isEditing={false} />
            }
          />
          <Route
            path="/repairs/new"
            element={<RepairForm currentOwner={currentOwner} />}
          />
          <Route
            path="/repairs/:id"
            element={
              <RepairForm currentOwner={currentOwner} isEditing={true} />
            }
          />
        </Routes>
      </Container>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
