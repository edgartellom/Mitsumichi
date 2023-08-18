
import Error404 from './pages/Error404';


import { createBrowserRouter, RouterProvider } from "react-router-dom";


function App() {

  const root = createBrowserRouter([
    {
      path: "/",
      element: <div></div>,
      errorElement : <Error404/>,
      children: [
        
        { path: "/home", element: <Home /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={root} />
    </>
  );
}

export default App;
