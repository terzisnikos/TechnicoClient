import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import OwnerList from './components/OwnerList';
import OwnerForm from './components/OwnerForm';
import PropertyItemList from './components/PropertyItemList';
import PropertyItemForm from './components/PropertyItemForm';
import RepairList from './components/RepairList';
import RepairForm from './components/RepairForm';

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/owners" element={<OwnerList />} />
      <Route path="/owners/new" element={<OwnerForm />} />
      <Route path="/owners/:id" element={<OwnerForm />} />
      <Route path="/property-items" element={<PropertyItemList />} />
      <Route path="/property-items/new" element={<PropertyItemForm />} />
      <Route path="/property-items/:id" element={<PropertyItemForm />} />
      <Route path="/repairs" element={<RepairList />} />
      <Route path="/repairs/new" element={<RepairForm />} />
      <Route path="/repairs/:id" element={<RepairForm />} />
    </Routes>
  </Router>
);

export default App;
