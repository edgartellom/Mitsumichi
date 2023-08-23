import RootLayot from "./helper/RootLayout";
import Home from "./pages/Home";
import { Dashboard } from "./pages";
import LandingPage from "./pages/LandingPage/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContext from "./context/Auth-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayot />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {

        path: "/home",
        element: <Home />,
//         path: "/dashboard",
//         element: <Dashboard />,

      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <UserContext>
        <RouterProvider router={router} />
      </UserContext>
    </div>
  );
}

export default App;
