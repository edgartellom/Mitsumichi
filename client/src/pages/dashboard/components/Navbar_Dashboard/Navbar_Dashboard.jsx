import React from "react";

const user = {
  name: "Hengers Emmanuel Rosario Morales",
  avatar: "https://avatars.githubusercontent.com/u/106262730?v=4",
  role: {
    value: "superAdmin",
    label: "S. Administrador",
  },
  email: "hengersrosario@example.com",
  phone: "+10987654321",
  status: "enabled",
};

const Navbar_Dashboard = () => {
  const isMobile = window.innerWidth <= 768 ? true : false;

  return isMobile ? (
    <nav className="bg-[#252525] h-[75px] w-full border-b-4 border-[#C63D05]"></nav>
  ) : (
    <nav className="bg-[#252525] h-[75px] w-full border-b-4 border-[#C63D05]">
      <div
        className={`flex flex-row-reverse h-full items-center mr-5 duration-300`}
      >
        <div className="flex border-2 border-[#C63D05] rounded-full w-[60px] h-[60px] overflow-hidden">
          <button type="button">
            <img src={user.avatar} alt="" />
          </button>
        </div>
        <div className="flex flex-col items-end mr-2 ">
          <h1 className="mt-1 text-[#ffffff] text-[14px] ">{user.name}</h1>
          <p className="text-[#C63D05] text-[14px] font-bold">
            {user.role.label}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_Dashboard;
