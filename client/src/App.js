import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './pages/inicio/inicio';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import DetallesEvento from './components/detallesEvento/detallesEvento';
import PublicarEvento from './components/publicarEvento/publicarEvento';

function App() {
  // Estado para almacenar el token
  const [token, setToken] = useState(null);

  // Verificar si hay un token en el localStorage al cargar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/inicio" element={token ? <Inicio /> : <Navigate to="/" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/event/:id" element={<DetallesEvento />} />
        <Route path="/event/new" element={<PublicarEvento />} />
      </Routes>
    </div>
  );
}

export default App;
