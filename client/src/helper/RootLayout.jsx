import { Outlet } from "react-router-dom";
import Footer from '../components/Footer/Footer'

const RootLayot = () => {
  return (
    <>
      <main>{<Outlet />}</main>
      <Footer />
    </>
  );
};

export default RootLayot;
