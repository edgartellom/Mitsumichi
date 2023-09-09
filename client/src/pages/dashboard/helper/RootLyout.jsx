import React, { useState } from "react";
import { Sidebar_Dashboard } from "../components";
import Navbar_Dashboard from "../components/Navbar_Dashboard/Navbar_Dashboard";

const RootLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-shrink-0">
        <Sidebar_Dashboard />
      </div>
      <div className="flex-grow">
        <Navbar_Dashboard />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
