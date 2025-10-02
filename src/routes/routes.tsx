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
import TutorJobBoard from "../pages/Dashboard/Tutor/TutorJobBoard/TutorJobBoard";
import ShareThisApp from "../pages/Dashboard/Shared/ShareThisApp/ShareThisApp";
import TermsAndConditionsDashboard from "../pages/Dashboard/Shared/TermsAndConditionsDashboard/TermsAndConditionsDashboard";
import Settings from "../pages/Dashboard/Shared/Settings/Settings";
import Payment from "../pages/Dashboard/Tutor/Payment/Payment";
import JobApplicationsSummary from "../pages/Dashboard/Tutor/JobApplicationsSummary/JobApplicationsSummary";
import MyProfile from "../pages/Dashboard/Shared/MyProfile/MyProfile";
import ReferAndEarn from "../pages/Dashboard/Tutor/ReferAndEarn/ReferAndEarn";
import GuardianDashboardHome from "../pages/Dashboard/Guardian/GuardianDashboardHome/GuardianDashboardHome";
import StudentSteps from "../components/HomePage/HowItWorksStudent/StudentSteps";
import ImportantGuidelines from "../pages/Dashboard/Shared/ImportantGuidelines/ImportantGuidelines";
import HireATutor from "../pages/Dashboard/Guardian/HireATutor/HireATutor";
import PostedJobs from "../pages/Dashboard/Guardian/PostedJobs/PostedJobs";
import Applications from "../pages/Dashboard/Guardian/Applications/Applications";
import TutorsResume from "../pages/Dashboard/Shared/TutorsResume/TutorsResume";
import AdminDashboardHome from "../pages/Dashboard/Admin/AdminDashboardHome/AdminDashboardHome";
import Guardians from "../pages/Dashboard/Admin/Guardians/Guardians";
import GuardianProfile from "../pages/Dashboard/Admin/GuardianProfile/GuardianProfile";
import EditJob from "../pages/Dashboard/Admin/EditJob/EditJob";
import Tutors from "../components/Admin/Tutors/Tutors";
import NoticeBoardManagement from "../pages/Dashboard/Admin/NoticeBoardManagement/NoticeBoardManagement";
import PaymentsManagement from "../pages/Dashboard/Admin/PaymentsManagement/PaymentsManagement";
import Staffs from "../pages/Dashboard/Admin/Staffs/Staffs";
import TestimonialManagement from "../pages/Dashboard/Admin/TestimonialManagement/TestimonialManagement";
import NotificationsManagement from "../pages/NotificationsManagement/NotificationsManagement";
import SendNotification from "../pages/NotificationsManagement/SendNotification";
import MyLeads from "../pages/Dashboard/Tutor/MyLeads/MyLeads";
import LeadManagement from "../pages/Dashboard/Admin/LeadManagement/LeadManagement";
import TuitionRequest from "../pages/TuitionRequest/TuitionRequest";
import ConfirmationLetters from "../pages/Dashboard/Tutor/ConfirmationLetters/ConfirmationLetters";
import Invoice from "../pages/Dashboard/Tutor/Invoice/Invoice";

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
        element: <Faq />,
      },
      {
        path: "tuition-request/referral/:id",
        element: <TuitionRequest />,
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
        path: "job-board",
        element: <TutorJobBoard />,
      },
      {
        path: "job-applications/:status",
        element: <JobApplicationsSummary />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "community",
        element: <JoinCommunity />,
      },
      {
        path: "share-app",
        element: <ShareThisApp />,
      },
      {
        path: "share-app",
        element: <ShareThisApp />,
      },
      {
        path: "refer-and-earn",
        element: <ReferAndEarn />,
      },
      {
        path: "my-leads",
        element: <MyLeads />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditionsDashboard />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "confirmation-letters",
        element: <ConfirmationLetters />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "important-guidelines",
        element: <ImportantGuidelines />,
      },
    ],
  },
  {
    path: "dashboard/guardian",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <GuardianDashboardHome />,
      },

      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "posted-jobs",
        element: <PostedJobs />,
      },
      {
        path: "applications/:jobId",
        element: <Applications />,
      },
      {
        path: "applications/:jobId/:tutorId",
        element: <TutorsResume />,
      },
      {
        path: "hire-a-tutor",
        element: <HireATutor />,
      },
      {
        path: "how-it-works",
        element: <StudentSteps />,
      },
      {
        path: "community",
        element: <JoinCommunity />,
      },
      {
        path: "share-app",
        element: <ShareThisApp />,
      },
      {
        path: "share-app",
        element: <ShareThisApp />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditionsDashboard />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "dashboard/admin",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <AdminDashboardHome />,
      },
      {
        path: "staffs",
        element: <Staffs />,
      },
      {
        path: "guardians",
        element: <Guardians />,
      },
      {
        path: "guardian/:id",
        element: <GuardianProfile />,
      },
      {
        path: "tutors",
        element: <Tutors />,
      },
      {
        path: "tutor/:tutorId",
        element: <TutorsResume />,
      },
      {
        path: "posted-jobs",
        element: <PostedJobs />,
      },
      {
        path: "edit-job/:jobId",
        element: <EditJob />,
      },
      {
        path: "applications/:jobId",
        element: <Applications />,
      },
      {
        path: "applications/resume/:tutorId",
        element: <TutorsResume />,
      },
      {
        path: "hire-a-tutor",
        element: <HireATutor />,
      },
      {
        path: "payments-management",
        element: <PaymentsManagement />,
      },
      {
        path: "notice-board-management",
        element: <NoticeBoardManagement />,
      },
      {
        path: "testimonials-management",
        element: <TestimonialManagement />,
      },
      {
        path: "notifications-management",
        element: <NotificationsManagement />,
      },
      {
        path: "send-notification",
        element: <SendNotification />,
      },
      {
        path: "lead-management",
        element: <LeadManagement />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
