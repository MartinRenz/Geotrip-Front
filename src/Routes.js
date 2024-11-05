import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Map from './pages/Map/Map'
import Login from './pages/Login/Login'

function RoutesApp() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </HashRouter>
  );
}

export default RoutesApp;
