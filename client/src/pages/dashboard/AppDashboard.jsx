import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { userAuth } from "../../context/Auth-context";
import { RootLayout } from "./helper";
import {
  Dashboard,
  Products_Admin,
  Orders_Admin,
  Users_Admin,
  Reviews_Admin,
  Offers_Admin,
  Create_New_Moto,
} from "./pages";

function AppDashboard() {
  const { role } = useContext(userAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "user") {
      navigate("/");
    }
  }, [role, navigate]);

  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Rutas para Productos */}
        <Route path="/products-admin" element={<Products_Admin />} />
        <Route
          path="/products-admin/add-new-moto"
          element={<Create_New_Moto />}
        />

        <Route path="/orders-admin" element={<Orders_Admin />} />
        <Route path="/users-admin" element={<Users_Admin />} />
        <Route path="/reviews-admin" element={<Reviews_Admin />} />
        <Route path="/offers-admin" element={<Offers_Admin />} />
      </Routes>
    </RootLayout>
  );
}

export default AppDashboard;
