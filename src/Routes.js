import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Map from './pages/Map/Map'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

function RoutesApp() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </HashRouter>
  );
}

export default RoutesApp;
