import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ClientsPage from "../screens/Clients/ClientsPage";
import ClientsForm from "../screens/Clients/ClientsForm";
import MainHeader from "../components/Layout/MainHeader";
import MainFooter from "../components/Layout/MainFooter";

const AppRoutes = () => (
  <BrowserRouter>
    <MainHeader />
    <Routes>
      <Route path="/clientes" element={<ClientsPage />} />

      <Route path="/clientes/novo" element={<ClientsForm />} />

      <Route path="/clientes/editar/:id" element={<ClientsForm />} />

      <Route path="*" element={<Navigate to="/clientes" />} />
    </Routes>
    <MainFooter />
  </BrowserRouter>
);

export default AppRoutes;
