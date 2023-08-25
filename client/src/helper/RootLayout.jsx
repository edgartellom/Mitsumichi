import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
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
