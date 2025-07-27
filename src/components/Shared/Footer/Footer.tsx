import { Link } from "react-router-dom";
import Container from "../../Reusable/Container/Container";
import { ICONS } from "../../../assets";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import Banner from "../Banner/Banner";

const Footer = () => {
  const socialLinks = [
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

  const quickLinks = [
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

  const contactInfo = [
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

  const companyDetails = [
    "Trade License No :",
    "TRAD/DNCC/095492/2022",
    "E-TIN Number : 435024284395",
    "BIN Number : 003669024-0102",
  ];

  const linkHeadingClassNames = "text-xl leading-7 font-medium text-white";
  return (
    <div className="bg-primary-50 pb-12 pt-[180px] xl:pt-[250px] font-Nunito relative">
      <div className="absolute -top-56 left-0 right-0">
        <Banner />
      </div>
      <Container>
        <div className="z-10 relative">
          <div className="flex flex-col xl:flex-row gap-10 justify-between">
            {/* Left side details */}
            <div className="max-w-[350px]">
              <div className="flex items-center gap-4">
                <Link to="/" className="size-15 p-[1px] bg-white rounded-xl">
                  <img src={ICONS.logo} alt="Logo" className="w-full" />
                </Link>
                <div>
                  <h1 className="text-xl md:text-3xl leading-7 font-bold text-white">
                    Bright Tuition Care
                  </h1>
                  <p className="text-sm md:text-lg leading-6 text-white mt-2">
                    Join, Learn, Teach
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-base text-neutral-50 mt-8">
                Bright Tuition Care connects students with verified tutors
                online. We offer a trusted space for connections.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h1 className={linkHeadingClassNames}>Quick Links</h1>

              <div className="flex flex-col gap-4 mt-5">
                {quickLinks?.map((item) => (
                  <a
                    key={item?.label}
                    href={item?.path}
                    className="text-sm md:text-base text-neutral-50 leading-6 hover:underline w-fit"
                  >
                    {item?.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Company info */}
            <div>
              <h1 className={linkHeadingClassNames}>Company Details</h1>

              <div className="flex flex-col gap-4 mt-5">
                {companyDetails?.map((item) => (
                  <p
                    key={item}
                    className="text-sm md:text-base text-neutral-50 leading-6 hover:underline w-fit"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="">
              <h1 className={linkHeadingClassNames}>Contact Info</h1>

              <div className="flex flex-col gap-4 mt-5">
                {contactInfo?.map((item) => (
                  <a
                    key={item?.label}
                    href={item?.href ? item?.href : ""}
                    className={`text-sm md:text-base text-neutral-50 leading-6 w-fit flex gap-2 ${
                      item?.href
                        ? "cursor-pointer hover:underline"
                        : "cursor-not-allowed"
                    }`}
                  >
                    {item?.icon}
                    <span className="max-w-[290px]">{item?.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse xl:flex-row items-center gap-8 xl:gap-54 mt-12">
            <div className="flex items-center gap-5">
              {socialLinks?.map((item, index) => (
                <a
                  key={index}
                  href={item?.href}
                  className="size-10 bg-white hover:bg-primary-10 text-primary-10 hover:text-white transition duration-300 rounded-xl flex items-center justify-center cursor-pointer"
                >
                  {item?.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-9">
              <div>
                <h1
                  className={`text-center lg:text-start ${linkHeadingClassNames}`}
                >
                  Join Our Community
                </h1>
                <div className="flex items-center gap-5 lg:gap-8 mt-5">
                  <img src={ICONS.tutorCommunity} alt="" />
                  <img src={ICONS.guardianCommunity} alt="" />
                </div>
              </div>
              <div>
                <h1
                  className={`text-center lg:text-start ${linkHeadingClassNames}`}
                >
                  Download Our App
                </h1>
                <div className="flex items-center gap-5 lg:gap-8 mt-5">
                  <img src={ICONS.playStoreCard} alt="" />
                  <img src={ICONS.appStoreCard} alt="" />
                </div>
              </div>
            </div>
          </div>

          <hr className="border border-neutral-30/50 my-6" />

          <p className="font-medium text-white text-center text-sm md:text-base">
            All Rights Reserved by Bright Tuition Care © 2025
          </p>
        </div>
      </Container>

      <div className="bg-primary-60/30 w-full rounded-[1300px] h-[200px] blur-[125px] absolute bottom-0"></div>
    </div>
  );
};

export default Footer;
