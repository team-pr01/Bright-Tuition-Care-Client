/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../../Reusable/Container/Container";
import { ICONS } from "../../../assets";

import Banner from "../Banner/Banner";
import {
  companyDetails,
  contactInfo,
  quickLinks,
  socialLinks,
} from "./footer.data";

const Footer: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const linkHeadingClassNames = "text-xl leading-7 font-medium text-white";

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, ease: "easeOut" },
    },
  };

  const itemVariants: any = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="bg-primary-50 pb-12 pt-[180px] xl:pt-[250px] font-Nunito relative">
      <div className="absolute -top-56 left-0 right-0">
        <Banner />
      </div>
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="z-10 relative"
        >
          <div className="flex flex-col xl:flex-row gap-10 justify-between">
            {/* Left side details */}
            <motion.div variants={itemVariants} className="max-w-[350px]">
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
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
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
            </motion.div>

            {/* Company info */}
            <motion.div variants={itemVariants}>
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
            </motion.div>

            {/* Contact info */}
            <motion.div variants={itemVariants}>
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
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col-reverse xl:flex-row items-center gap-8 xl:gap-[150px] mt-12"
          >
            <div className="flex items-center gap-5">
              {socialLinks?.map((item, index) => (
                <a
                  key={index}
                  href={item?.href}
                  className="hover:text-primary-10 text-neutral-100 transition duration-300 cursor-pointer"
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
                  <img src={ICONS.tutorCommunity} alt="Tutor Community" />
                  <img src={ICONS.guardianCommunity} alt="Guardian Community" />
                </div>
              </div>
              <div>
                <h1
                  className={`text-center lg:text-start ${linkHeadingClassNames}`}
                >
                  Download Our App
                </h1>
                <div className="flex items-center gap-5 lg:gap-8 mt-5">
                  <img src={ICONS.playStoreCard} alt="Play Store" />
                  <img src={ICONS.appStoreCard} alt="App Store" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <hr className="border border-neutral-30/50 my-6" />
            <div className="flex items-center justify-between">
              <p className="font-medium text-white text-center text-sm md:text-base">
                All Rights Reserved by Bright Tuition Care © 2025
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="/terms-and-conditions"
                  className={`text-sm md:text-base text-neutral-50 leading-6 w-fit flex gap-2 cursor-pointer hover:underline`}
                >
                  <span className="max-w-[290px]">Terms & Conditions</span>
                </a>
                <a
                  href="/faqs"
                  className={`text-sm md:text-base text-neutral-50 leading-6 w-fit flex gap-2 cursor-pointer hover:underline`}
                >
                  <span className="max-w-[290px]">FAQs</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      <div className="bg-primary-60/30 w-full rounded-[1300px] h-[200px] blur-[125px] absolute bottom-0"></div>
    </div>
  );
};

export default Footer;
