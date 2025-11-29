import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline, IoLogoTiktok } from "react-icons/io5";
import { SiWhatsapp } from "react-icons/si";

export const socialLinks = [
  {
    icon: <FaFacebookF className="text-2xl" />,
    href: "https://www.facebook.com/brightcaretuition",
  },
  {
    icon: <FaInstagram className="text-2xl" />,
    href: "https://www.instagram.com/brighttuitioncare?igsh=eDkweG9taGwycG56",
  },
  {
    icon: <FaLinkedinIn className="text-2xl" />,
    href: "https://www.linkedin.com/in/bright-tuition-care-bd-ba38b5372",
  },
  {
    icon: <FaYoutube className="text-2xl" />,
    href: "https://www.youtube.com/@BrightTuitionCare",
  },
  {
    icon: <FaTwitter className="text-2xl" />,
    href: "https://x.com/tuition85435?t=fRRlZarWV7BCM1gwSzrfrQ&s=09",
  },
  {
    icon: <IoLogoTiktok className="text-2xl" />,
    href: "https://www.tiktok.com/@bright.tuition.ca?_r=1&_t=ZS-91mdCCXGuuG",
  },
  {
    icon: <SiWhatsapp className="text-[22px]" />,
    href: "https://wa.me/8801988603820",
  },
];

export const quickLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Job Board",
    path: "/job-board",
  },
  {
    label: "Hire A Tutor",
    path: "/hire-a-tutor",
  },
  {
    label: "Become A Tutor",
    path: "/signup",
  },
  {
    label: "Terms & Conditions",
    path: "/terms-and-conditions",
  },
  {
    label: "FAQs",
    path: "/faqs",
  },
];

export const contactInfo = [
  {
    icon: <FiPhone className="text-xl" />,
    label: "09617-785588",
    href: "tel:09617-785588",
  },
  {
    icon: <HiOutlineMail className="text-xl" />,
    label: "brighttuitioncare@gmail.com",
    href: "mailto:brighttuitioncare@gmail.com",
  },
  {
    icon: <IoLocationOutline className="text-xl" />,
    label: "Noorjahan Road, Mohammadpur, Dhaka-1207",
  },
];

export const companyDetails = [
  "Trade License No :",
  "TRAD/DNCC/017918/2023",
  "E-TIN Number : 435024284395",
  "BIN Number : 003669024-010",
];
