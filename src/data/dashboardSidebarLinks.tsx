import React from "react";
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuUser,
  LuCreditCard,
  LuSettings,
  LuAward,
  LuShare2,
  LuFileText,
} from "react-icons/lu";
import { RiFacebookFill } from "react-icons/ri";
import { TbSettingsQuestion } from "react-icons/tb";

interface DashboardLink {
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
    path: "/dashboard/tutor/home",
    icon: <LuLayoutDashboard />,
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
    label: "Settings",
    path: "/dashboard/tutor/settings",
    icon: <LuSettings />,
  },
  {
    label: "Join Community",
    path: "/dashboard/tutor/community",
    icon: <RiFacebookFill />,
  },
];

export const adminDashboardLinks: DashboardLink[] = [
  {
    label: "Dashboard",
    path: "/dashboard/tutor/home",
    icon: <LuLayoutDashboard />,
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
    label: "Settings",
    path: "/dashboard/tutor/settings",
    icon: <LuSettings />,
  },
  {
    label: "Join Community",
    path: "/dashboard/tutor/community",
    icon: <RiFacebookFill />,
  },
];

export const otherLinks: DashboardLink[] = [
  {
    label: "Share The App",
    path: "/dashboard/tutor/share-app",
    icon: <LuShare2 />,
  },
  {
    label: "Terms & Conditions",
    path: "/dashboard/tutor/terms-and-conditions",
    icon: <LuFileText />,
  },
];
