import { Outlet } from "react-router-dom";

const RootLayot = () => {
  return (
    <>
      <main>{<Outlet />}</main>
    </>
  );
};

export default RootLayot;
