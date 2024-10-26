import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from './pages/Map/Map'
import Login from './pages/Login/Login'

function RoutesApp() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
