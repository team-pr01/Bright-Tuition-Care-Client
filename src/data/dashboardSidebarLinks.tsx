import React from "react";
import { BsBriefcase } from "react-icons/bs";
import { FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import {
  FiCreditCard,
  FiFileText,
  FiInfo,
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
  LuAward,
  LuShare2,
  LuFileText,
  LuUserRoundSearch,
} from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { RiFacebookFill } from "react-icons/ri";
import { TbSettingsQuestion } from "react-icons/tb";

interface DashboardLink {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const user = { role: "guardian" };

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
  {
    label: "Join Community",
    path: "/dashboard/tutor/community",
    icon: <RiFacebookFill />,
  },
  {
    label: "Refer And Earn",
    path: "/dashboard/tutor/refer-and-earn",
    icon: <LuAward />,
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
    label: "Hire Tutor",
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
    label: "Confirmation Letters",
    path: "/dashboard/guardian/confirmation-letters",
    icon: <MdOutlineMail />,
  },
  {
    label: "Settings",
    path: "/dashboard/guardian/settings",
    icon: <LuSettings />,
  },
  {
    label: "Join Community",
    path: "/dashboard/guardian/community",
    icon: <RiFacebookFill />,
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
    label: "Hire Tutor",
    path: "/dashboard/admin/hire-a-tutor",
    icon: <LuUserRoundSearch />,
  },
  {
    label: "Posted Jobs",
    path: "/dashboard/admin/posted-jobs",
    icon: <BsBriefcase />,
  },
  {
    label: "Payments",
    path: "/dashboard/admin/payments-management",
    icon: <FiCreditCard />,
  },
  {
    label: "Notice Board",
    path: "/dashboard/admin/notice-board-management",
    icon: <FiInfo />,
  },
  {
    label: "Testimonials",
    path: "/dashboard/admin/testimonials-management",
    icon: <FiStar />,
  },
  {
    label: "Notifications",
    path: "/dashboard/admin/notifications-management",
    icon: <IoNotificationsOutline />,
  },
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

export const otherLinks: DashboardLink[] = [
  {
    label: "Share The App",
    path: `/dashboard/${
      user?.role === "tutor" ? "tutor" : "guardian"
    }/share-app`,
    icon: <LuShare2 />,
  },
  {
    label: "Terms & Conditions",
    path: `/dashboard/${
      user?.role === "tutor" ? "tutor" : "guardian"
    }/terms-and-conditions`,
    icon: <LuFileText />,
  },
];
