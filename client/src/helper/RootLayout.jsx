import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Footer, AddButton } from "../components";
const RootLayot = () => {
  const { pathname } = useLocation();
  return (
    <>
      {(pathname !== "/" && pathname.includes("/dashboard")) || <Navbar /> ||
        (pathname === "/home" && <AddButton />)}

      <main className=" flex-1 bg-gray-300">{<Outlet />}</main>

      {(pathname !== "/" && pathname.includes("/dashboard")) || <Footer />}
    </>
  );
};

export default RootLayot;
