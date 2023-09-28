import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { useContext, useEffect } from "react";
import { userAuth } from "../context/Auth-context";
const RootLayot = () => {
  const { pathname } = useLocation();
  const { user } = useContext(userAuth);

  useEffect(() => {
    if (user?.status === "banned") {
      window.location.href = "https://www.google.com";
    }
  }, [user]);

  // if (user.status === "active") {
  //   window.location.href = "https://www.google.com";
  // }

  return (
    <div>
      <header className=" sticky top-0 bg-white z-30">
        {pathname !== "/" && !pathname.includes("/dashboard") && <Navbar />}
      </header>
      <main className=" flex-1 bg-gray-300">{<Outlet />}</main>

      {pathname !== "/" && !pathname.includes("/dashboard") && <Footer />}
    </div>
  );
};

export default RootLayot;
