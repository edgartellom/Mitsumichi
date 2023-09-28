import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { userAuth } from "../../context/Auth-context";
import { RootLayout } from "./helper";
import {
  Dashboard,
  Products_Admin,
  Create_New_Moto,
  Product_Edit,
  Orders_Admin,
  Users_Admin,
  Reviews_Admin,
  Offers_Admin,
} from "./pages";

function AppDashboard() {
  const { user, currentUser } = useContext(userAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "user") {
      navigate("/");
    }
  }, [user, navigate, currentUser]);

  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Rutas para Productos */}
        <Route path="/products-admin/" element={<Products_Admin />} />
        <Route path="/products-admin/:id" element={<Product_Edit />} />
        <Route
          path="/products-admin/add-new-moto"
          element={<Create_New_Moto />}
        />
        {/* Rutas para Ordenes */}
        <Route path="/orders-admin" element={<Orders_Admin />} />
        <Route path="/orders-admin/:id" element={""} />
        {/* Rutas para users */}
        <Route path="/users-admin" element={<Users_Admin />} />
        <Route path="/users-admin/:id" element={""} />
        {/* Rutas para reviews */}
        <Route path="/reviews-admin" element={<Reviews_Admin />} />
        {/* Rutas para offers */}
        <Route path="/offers-admin" element={<Offers_Admin />} />
      </Routes>
    </RootLayout>
  );
}

export default AppDashboard;
