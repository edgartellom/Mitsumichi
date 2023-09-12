import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Footer, AddButton } from "../components";
const RootLayot = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <header className=" sticky top-0 bg-white z-30">
        {pathname !== "/" && !pathname.includes("/dashboard") && <Navbar />}
      </header>
      {pathname === "/home" && <AddButton />}
      <main className=" flex-1 bg-gray-300">{<Outlet />}</main>

      {pathname !== "/" && !pathname.includes("/dashboard") && <Footer />}
    </div>
  );
};

export default RootLayot;
