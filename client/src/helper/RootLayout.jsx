import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Footer } from "../components";
const RootLayot = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/" && <Navbar />}
      <main className=" flex-1">{<Outlet />}</main>
      {pathname !== "/" && <Footer />}
    </>
  );
};

export default RootLayot;
