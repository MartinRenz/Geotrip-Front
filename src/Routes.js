import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Map from './pages/Map/Map'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function RoutesApp() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/map" element={<Map />} />
      </Routes>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover= {false}
          containerId="GlobalApplicationToast"
          pauseOnFocusLoss
          draggable
      />
    </HashRouter>
  );
}

export default RoutesApp;
