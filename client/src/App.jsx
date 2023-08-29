import RootLayot from "./helper/RootLayout";
import { Home, LandingPage } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContext from "./context/Auth-context";
import About from "./pages/About/About";
import Error404 from "./pages/Error404/Error404";
/* import { PaypalButton } from "./components/PaypalButton/PaypalButton"; */
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayot />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about us",
        element: <About />,
      },
     /*  {
      path: "/paypal-button/:precio/:nombre",
      element: <PaypalButton />,
      } */
    ],
  },
]);

function App() {
  return (
    <div className="App flex flex-col h-screen">
      <UserContext>
        <RouterProvider router={router} />
      </UserContext>
    </div>
  );
}

export default App;
