import RootLayot from "./helper/RootLayout";
import { AppDashboard, Home, LandingPage, Detail } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContext from "./context/Auth-context";
import About from "./pages/About/About";
import Error404 from "./pages/Error404/Error404";
import PayPalButton from "./components/PaypalButton/PaypalButton.jsx"; // quité {PayPalButton}
import Profile from "./pages/Profile/Profile";

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
        path: "/dashboard/*",
        element: <AppDashboard />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about us",
        element: <About />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/paypal-button/:precio/:nombre",
        element: <PayPalButton />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
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
