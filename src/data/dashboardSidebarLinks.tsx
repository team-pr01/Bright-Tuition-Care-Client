import React from 'react';
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuUser,
  LuCreditCard,
  LuSettings,
  LuAward,
  LuShare2,
  LuFileText,
} from 'react-icons/lu';
import { RiFacebookFill } from 'react-icons/ri';
import { TbSettingsQuestion } from 'react-icons/tb';

interface DashboardLink {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const tutorDashboardLinks: DashboardLink[] = [
  {
    label: 'Dashboard',
    path: '/dashboard/tutor/home',
    icon: <LuLayoutDashboard />,
  },
  {
    label: 'Job board',
    path: '/dashboard/tutor/job-board',
    icon: <LuClipboardList />,
  },
  {
    label: 'Profile',
    path: '/dashboard/tutor/profile',
    icon: <LuUser />,
  },
  {
    label: 'How it Works',
    path: '/how-it-works',
    icon: <TbSettingsQuestion />,
  },
  {
    label: 'Payment',
    path: '/dashboard/tutor/payment',
    icon: <LuCreditCard />,
  },
  {
    label: 'Settings',
    path: '/dashboard/tutor/settings',
    icon: <LuSettings />,
  },
  {
    label: 'Join community',
    path: '/community',
    icon: <RiFacebookFill />,
  },
  {
    label: 'Refer and earn',
    path: '/refer-and-earn',
    icon: <LuAward />,
  },
  {
    label: 'Share this app',
    path: '/share',
    icon: <LuShare2 />,
  },
  {
    label: 'Terms and conditions',
    path: '/terms-and-conditions',
    icon: <LuFileText />,
  },
];