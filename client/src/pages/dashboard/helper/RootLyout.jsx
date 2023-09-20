import React from "react";

import {
  Control_Panel,
  Sidebar_Dashboard,
  Navbar_Dashboard,
} from "../components";

const RootLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <Sidebar_Dashboard />
      </div>
      <div className="flex-grow flex flex-col">
        <Navbar_Dashboard />
        <Control_Panel />
        <div className="flex-grow flex-shrink-0 bg-white overflow-auto h-[calc(100vh-187px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
