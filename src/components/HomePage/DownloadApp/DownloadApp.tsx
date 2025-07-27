import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "../../Reusable/Container/Container";
import { ICONS, IMAGES } from "../../../assets";
import Heading from "../../Reusable/Heading/Heading";
import IconButton from "../../Reusable/Button/IconButton";
import type { Variants } from "framer-motion";

const DownloadApp: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });


  const imageVariants: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 50,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const contentVariants: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 50,
        damping: 20,
        duration: 0.8,
        delay: 0.2, // A slight delay to make the entrance feel more dynamic
      },
    },
  };

  return (
    <div
      className="py-6 lg:py-[50px] w-full overflow-x-hidden" // Added overflow-x-hidden to prevent horizontal scrollbars during animation
      style={{
        background: "linear-gradient(101deg, #FFF -7.84%, #E8F3FF 74.03%)",
      }}
    >
      <Container>
        <div
          ref={ref}
          className="flex flex-col lg:flex-row font-Nunito h-fit items-center justify-between gap-6 lg:gap-[44px]"
        >
          <motion.img
            src={IMAGES.appDownload}
            alt="App on a phone"
            className="w-auto h-[548px]"
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />

          {/* Right Image Content */}
          <motion.div
            className="w-full lg:w-[60%] flex flex-col gap-4 lg:gap-8"
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Heading
              titleParts={[
                {
                  text: "Download the App for Seamless Learning and Teaching Experience",
                },
              ]}
              headingClassName="text-center lg:text-start max-w-[690px]"
            />

            <p className="text-neutral-20 text-lg leading-[24px] text-center lg:text-start">
              Bright Tuition Care is Bangladesh's first and most trusted online
              platform for guardians, students and tutors to connect with
              verified tutors and find any tuition jobs throughout the country.
              Bright tuition care is dedicated to bridging the educational
            </p>
            <div className="flex justify-center lg:justify-start flex-row gap-4 items-center">
              <IconButton variant="primary" icon={ICONS.appStore} />
              <IconButton variant="primary" icon={ICONS.playStore} />
            </div>
          </motion.div>
        </div>

        {/* Left Content */}
      </Container>
    </div>
  );
};

export default DownloadApp;