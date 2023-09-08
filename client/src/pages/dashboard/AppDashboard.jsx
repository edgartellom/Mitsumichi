import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { RootLayout } from "./helper";
import { Dashboard } from "./pages";
import { useContext } from "react";
import { userAuth } from "../../context/Auth-context";

function AppDashboard() {
  const { currentUser } = useContext(userAuth);
  const navigate = useNavigate();

  if (!currentUser || currentUser.role !== "admin") return navigate("/");

  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </RootLayout>
  );
}

export default AppDashboard;
