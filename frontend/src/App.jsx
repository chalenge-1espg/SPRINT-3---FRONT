// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Escalacao from "./routes/Escalacao";
import Login from "./routes/Login";
import Principal from "./routes/Home";
import Escudo from "./routes/Escudo";
import Error from "./routes/Error";
import Nav from "./components/Nav";
import Cadastro from "./routes/Cadastro";

const App = () => {
  return (
    <BrowserRouter>
      {/* Barra de navegação fixa */}
      <Nav />

      {/* Conteúdo com espaçamento para não ficar escondido atrás do nav */}
      <div className="pt-20">
        <Routes>
          {/* Redireciona "/" para login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Rotas principais */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Principal />} />
          <Route path="/escudo" element={<Escudo />} />
          <Route path="/escalacao" element={<Escalacao />} />

          {/* Página de erro para rotas inexistentes */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
