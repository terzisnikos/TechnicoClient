import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import OwnerList from "./components/OwnerList";
import OwnerForm from "./components/OwnerForm";
import PropertyItemList from "./components/PropertyItemList";
import PropertyItemForm from "./components/PropertyItemForm";
import RepairList from "./components/RepairList";
import RepairForm from "./components/RepairForm";
import Login from "./components/Login";
import { Container } from "@mui/material";

const currentOwner = {
  name: "admin",
  password: "password",
  type: "admin",
  //type: "user",
};

const App = () => (
  <Router>
    <NavBar currentOwner={currentOwner} />
    <Container>
      <Routes>
        <Route path="/" element={<Login currentOwner={currentOwner} />} />
        <Route
          path="/owners"
          element={<OwnerList currentOwner={currentOwner} />}
        />
        <Route
          path="/owners/new"
          element={<OwnerForm currentOwner={currentOwner} />}
        />
        <Route
          path="/owners/:id"
          element={<OwnerForm currentOwner={currentOwner} />}
        />
        <Route
          path="/property-items"
          element={<PropertyItemList currentOwner={currentOwner} />}
        />
        <Route
          path="/property-items/new"
          element={<PropertyItemForm currentOwner={currentOwner} />}
        />
        <Route
          path="/property-items/:id"
          element={<PropertyItemForm currentOwner={currentOwner} />}
        />
        <Route
          path="/repairs"
          element={<RepairList currentOwner={currentOwner} />}
        />
        <Route
          path="/repairs/new"
          element={<RepairForm currentOwner={currentOwner} />}
        />
        <Route
          path="/repairs/:id"
          element={<RepairForm currentOwner={currentOwner} />}
        />
      </Routes>
    </Container>
  </Router>
);

export default App;
