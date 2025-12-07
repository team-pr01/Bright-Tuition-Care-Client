/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { RxArrowTopRight } from "react-icons/rx";
import Container from "../../Reusable/Container/Container";

const Banner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const buttonCommonClassNames =
    "flex items-center justify-center gap-2 leading-[24px] min-w-[200px] sm:min-w-fit w-fit rounded-lg font-semibold font-Nunito cursor-pointer transition-all duration-300 py-2 lg:py-3 px-3 lg:px-6 text-sm md:text-lg";

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: ["easeOut"],
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <Container>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="bg-primary-10 rounded-3xl px-4 py-7 md:px-12 md:py-12 font-Nunito relative overflow-hidden"
      >
        <motion.h1
          variants={itemVariants}
          className="text-xl md:text-4xl lg:text-[44px] leading-7 md:leading-10 lg:leading-12 text-center font-bold text-white max-w-[800px] mx-auto"
        >
          Start your journey to effective learning and tutoring with a simple
          registration.
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xs md:text-base leading-5 lg:leading-6 text-center font-medium mt-4 text-white max-w-[655px] mx-auto"
        >
          With one easy registration, guardians can connect with verified tutors
          and tutors access genuine students on a trusted platform. Join Bright
          Tuition Care to make learning and tutoring simple, effective and
          rewarding!
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-8"
        >
          <a
            href="/signup/guardian"
            className={`bg-white hover:bg-transparent border border-white hover:text-white text-primary-10 ${buttonCommonClassNames}`}
          >
            Join as A Guardian{" "}
            <RxArrowTopRight className="text-2xl font-black" />
          </a>
          <a
            href="/signup/tutor"
            className={`hover:bg-white border border-white hover:text-primary-10 text-white ${buttonCommonClassNames}`}
          >
            Become A Tutor <RxArrowTopRight className="text-2xl font-black" />
          </a>
        </motion.div>

        {/* Shapes */}
        <div className="absolute top-0 right-0 h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 457 364"
            fill="none"
            className="w-full lg:w-[455px] h-full lg:h-[364px]"
          >
            <path
              opacity="0.07"
              d="M9.93993 444.334C57.3409 336.273 447.319 177.41 521.654 286.017C585.875 379.848 313.178 489.493 352.337 257.65C371.139 146.327 469.45 -4.16067 571.473 -18.921"
              stroke="white"
              strokeWidth="20"
            />
          </svg>
        </div>

        <div className="absolute top-0 left-0 h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 455 364"
            fill="none"
            className="w-full lg:w-[455px] h-full lg:h-[364px]"
          >
            <path
              opacity="0.07"
              d="M444.913 440.334C397.512 332.273 7.53452 173.41 -66.8005 282.017C-131.022 375.848 141.675 485.493 102.517 253.65C83.7139 142.327 -14.5966 -8.16067 -116.619 -22.921"
              stroke="white"
              strokeWidth="20"
            />
          </svg>
        </div>
      </motion.div>
    </Container>
  );
};

export default Banner;
