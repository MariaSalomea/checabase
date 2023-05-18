// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar'
import Roles from './components/Roles';
import Unidades from './components/Unidades';
import SeleccionarRol from './components/SeleccionarRol';

function App() {

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/roles" element={<Roles />} />
          <Route path="/unidades" element={<Unidades />} />
          <Route path="/seleccionarrol" element={<SeleccionarRol />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
