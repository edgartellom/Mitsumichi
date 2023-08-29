import React from "react";
import { Routes, Route } from "react-router-dom";
import { RootLayout } from "./helper";
import { Dashboard } from "./pages";

function AppDashboard() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </RootLayout>
  );
}

export default AppDashboard;
