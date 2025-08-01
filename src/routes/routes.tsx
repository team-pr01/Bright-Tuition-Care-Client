import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import JobBoard from "../pages/JobBoard/JobBoard";
import Tutorial from "../pages/Tutorial/Tutorial";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/job-board",
        element: <JobBoard/>,
      },
      {
        path: "/tutorial",
        element: <Tutorial/>,
      },
    ],
  },
]);