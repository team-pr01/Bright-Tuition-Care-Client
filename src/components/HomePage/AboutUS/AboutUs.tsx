/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Container from "../../Reusable/Container/Container";
import { ICONS, IMAGES } from "../../../assets";
import Heading from "../../Reusable/Heading/Heading";
import Button from "../../Reusable/Button/Button";

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants:any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 60,
        damping: 14,
        mass: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

const itemVariants:any = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};


  return (
    <Container>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col-reverse lg:flex-row font-Nunito h-fit justify-between items-center gap-[44px] my-[50px] overflow-hidden"
      >
        {/* Left Image */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-[40%] flex flex-col justify-start"
        >
          <img
            src={IMAGES.aboutUs}
            alt="About Us Section"
            className="rounded-xl"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div variants={itemVariants} className="w-full lg:w-[60%]">
          <div>
            <Heading titleParts={[{ text: "About Bright Tuition Care" }]} />
            <div className="flex flex-col gap-5 mt-2 lg:mt-4 text-neutral-45 text-lg leading-6 text-center lg:text-start">
              <p className="font-Nunito">
                At Bright Tutor Care, we are passionate about connecting
                students with the perfect tutors to support their learning
                journey. Whether you are a student, guardian, or tutor, our
                mission is to make tutoring simple, effective, and accessible
                for everyone. We believe that every student deserves quality
                education tailored to their unique needs. That's why we have
                built a trusted platform where finding the right tutor is quick,
                reliable, and hassle-free. From academic subjects to special
                skills, our network of experienced tutors is here to help
                students reach their full potential.
              </p>
            </div>
            <div className="flex flex-row gap-4 mt-12 items-center justify-center lg:justify-start">
              <Button
                label="Hire A Tutor"
                variant="primary"
                icon={ICONS.topRightArrow}
              />
              <Button
                label="Become A Tutor"
                variant="secondary"
                icon={ICONS.topRightArrowWhite}
                iconBg="#0D99FF"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default AboutUs;
