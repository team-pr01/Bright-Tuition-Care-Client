import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";

export const socialLinks = [
  {
    icon: <FaFacebookF className="text-xl" />,
    href: "https://www.facebook.com/",
  },
  {
    icon: <FaInstagram className="text-xl" />,
    href: "https://www.facebook.com/",
  },
  {
    icon: <FaLinkedinIn className="text-xl" />,
    href: "https://www.facebook.com/",
  },
  {
    icon: <FaYoutube className="text-xl" />,
    href: "https://www.facebook.com/",
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
    label: "Contact Us",
    path: "/contact-us",
  },
  {
    label: "Become A Tutor",
    path: "/become-a-tutor",
  },
];

export const contactInfo = [
  {
    icon: <FiPhone className="text-xl" />,
    label: "+880 1616-012365",
    href: "tel:+8801616012365",
  },
  {
    icon: <HiOutlineMail className="text-xl" />,
    label: "brighttuitioncare@gmail.com",
    href: "mailto:brighttuitioncare@gmail.com",
  },
  {
    icon: <IoLocationOutline className="text-xl" />,
    label: "7 temasek boulevard #12-07 suntec tower one singapore (038987)",
  },
];

export const companyDetails = [
  "Trade License No :",
  "TRAD/DNCC/095492/2022",
  "E-TIN Number : 435024284395",
  "BIN Number : 003669024-0102",
];
