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
import Faq from "../pages/Faq/Faq";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import VerifyOtp from "../pages/Auth/VerifyOtp/VerifyOtp";
import DashboardLayout from "../layouts/DashboardLayout";
import TutorDashboardHome from "../pages/Dashboard/Tutor/TutorDashboardHome/TutorDashboardHome";
import HowItWorks from "../pages/Dashboard/Tutor/HowItWorks/HowItWorks";
import JoinCommunity from "../pages/Dashboard/Shared/JoinCommunity/JoinCommunity";

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
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "faqs",
        element: <Faq/>,
      },
    ],
  },
  {
    path: "dashboard/tutor",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <TutorDashboardHome />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "community",
        element: <JoinCommunity />,
      },
    ],
  },
]);
