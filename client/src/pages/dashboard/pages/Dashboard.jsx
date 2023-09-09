import React from "react";
import { Moto_Create, Sidebar_Dashboard } from "../components";

const Dashboard = () => {
  return (
    <div className=" flex min-w-[100%] justify-center">
      <div className="w-full">
        <Sidebar_Dashboard />
      </div>
      {/* <div>
        <Moto_Create />
      </div> */}
    </div>
  );
};

export default Dashboard;
