import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Footer, AddButton } from "../components";
const RootLayot = () => {
  const { pathname } = useLocation();
  return (
    <>
      {(pathname !== "/" && <Navbar />) ||
        (pathname === "/home" && <AddButton />)}
      <main className=" flex-1 bg-gray-300">{<Outlet />}</main>
      {pathname !== "/" && <Footer />}
    </>
  );
};

export default RootLayot;
