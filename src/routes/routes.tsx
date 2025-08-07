import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import JobBoard from "../pages/JobBoard/JobBoard";
import Tutorial from "../pages/Tutorial/Tutorial";
import ContactUs from "../pages/ContactUs/ContactUs";
import Signup from "../pages/Signup/Signup";
import SignIn from "../pages/Auth/SignIn/SignIn";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";

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
        path: "/job-board",
        element: <JobBoard />,
      },
      {
        path: "/tutorial",
        element: <Tutorial />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
    ],
  },
]);
