import React from "react";
import { AiOutlineSound } from "react-icons/ai";
import { BsArrowCounterclockwise, BsBriefcase } from "react-icons/bs";
import {
  FaChalkboardTeacher,
  FaRegFileAlt,
  FaUserShield,
} from "react-icons/fa";
import {
  FiCreditCard,
  FiFileText,
  FiStar,
  FiUserPlus,
} from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuUser,
  LuCreditCard,
  LuSettings,
  LuUserRoundSearch,
} from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { TbSettingsQuestion } from "react-icons/tb";

export interface DashboardLink {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const tutorDashboardLinks: DashboardLink[] = [
  {
    label: "Dashboard",
    path: "/dashboard/tutor/home",
    icon: <LuLayoutDashboard />,
  },
  {
    label: "Job Board",
    path: "/dashboard/tutor/job-board",
    icon: <LuClipboardList />,
  },
  {
    label: "Profile",
    path: "/dashboard/tutor/my-profile",
    icon: <LuUser />,
  },
  {
    label: "My Applications",
    path: "/dashboard/tutor/my-applications/applied",
    icon: <FaRegFileAlt />,
  },
  {
    label: "How It Works",
    path: "/dashboard/tutor/how-it-works",
    icon: <TbSettingsQuestion />,
  },
  {
    label: "Payment",
    path: "/dashboard/tutor/payment",
    icon: <LuCreditCard />,
  },
  {
    label: "Invoice",
    path: "/dashboard/tutor/invoice",
    icon: <FiFileText />,
  },
  {
    label: "Confirmation Letters",
    path: "/dashboard/tutor/confirmation-letters",
    icon: <MdOutlineMail />,
  },
  {
    label: "Settings",
    path: "/dashboard/tutor/settings",
    icon: <LuSettings />,
  },
];

export const guardianDashboardLinks: DashboardLink[] = [
  {
    label: "Dashboard",
    path: "/dashboard/guardian/home",
    icon: <LuLayoutDashboard />,
  },
  {
    label: "Profile",
    path: "/dashboard/guardian/my-profile",
    icon: <LuUser />,
  },
  {
    label: "Hire a Tutor",
    path: "/dashboard/guardian/hire-a-tutor",
    icon: <LuUserRoundSearch />,
  },

  {
    label: "Posted Jobs",
    path: "/dashboard/guardian/posted-jobs",
    icon: <BsBriefcase />,
  },
  {
    label: "How It Works",
    path: "/dashboard/guardian/how-it-works",
    icon: <TbSettingsQuestion />,
  },
  {
    label: "Payment",
    path: "/dashboard/guardian/payment",
    icon: <LuCreditCard />,
  },
  {
    label: "Invoice",
    path: "/dashboard/guardian/invoice",
    icon: <FiFileText />,
  },
  {
    label: "Confirmation Letters",
    path: "/dashboard/guardian/confirmation-letters",
    icon: <MdOutlineMail />,
  },
  {
    label: "Settings",
    path: "/dashboard/guardian/settings",
    icon: <LuSettings />,
  },
];

export const adminDashboardLinks: DashboardLink[] = [
  {
    label: "Dashboard",
    path: "/dashboard/admin/home",
    icon: <LuLayoutDashboard />,
  },
  {
    label: "Staffs",
    path: "/dashboard/admin/staffs",
    icon: <FiUserPlus />,
  },
  {
    label: "Guardian/Students",
    path: "/dashboard/admin/guardians",
    icon: <FaUserShield />,
  },
  {
    label: "Tutors",
    path: "/dashboard/admin/tutors",
    icon: <FaChalkboardTeacher />,
  },
  {
    label: "Hire a Tutor",
    path: "/dashboard/admin/hire-a-tutor",
    icon: <LuUserRoundSearch />,
  },
  {
    label: "All Jobs",
    path: "/dashboard/admin/all-jobs/all",
    icon: <BsBriefcase />,
  },
  {
    label: "Payments",
    path: "/dashboard/admin/payments-management",
    icon: <FiCreditCard />,
  },
  {
    label: "Refund Request",
    path: "/dashboard/admin/refund-requests",
    icon: <BsArrowCounterclockwise />,
  },
  {
    label: "Invoice",
    path: "/dashboard/admin/invoice-management",
    icon: <FiFileText />,
  },
  {
    label: "Confirmation Letters",
    path: "/dashboard/admin/confirmation-letters-management",
    icon: <MdOutlineMail />,
  },
  {
    label: "Notice Board",
    path: "/dashboard/admin/notice-board-management",
    icon: <AiOutlineSound />,
  },
  {
    label: "Testimonials",
    path: "/dashboard/admin/testimonials-management",
    icon: <FiStar />,
  },
  {
    label: "Notifications",
    path: "/dashboard/admin/send-notification",
    icon: <IoNotificationsOutline />,
  },
  // {
  //   label: "Notifications",
  //   path: "/dashboard/admin/notifications-management",
  //   icon: <IoNotificationsOutline />,
  // },
  {
    label: "Leads",
    path: "/dashboard/admin/lead-management",
    icon: <HiOutlineUser />,
  },
  {
    label: "Settings",
    path: "/dashboard/admin/settings",
    icon: <LuSettings />,
  },
];
