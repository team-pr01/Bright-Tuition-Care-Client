/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useRef } from "react";
import Container from "../../Reusable/Container/Container";
import { ICONS, IMAGES } from "../../../assets";
import Heading from "../../Reusable/Heading/Heading";
import Button from "../../Reusable/Button/Button";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const ref = useRef(null);

  const containerVariants: any = {
    hidden: { opacity: 0, y: "5%" },
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

  const itemVariants: any = {
    hidden: { y: "10%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: "easeInOut", duration: 0.8 },
    },
  };

  return (
    <Container>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
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
        <motion.div
          variants={itemVariants}
          whileInView="visible"
          className="w-full lg:w-[60%]"
        >
          <div>
            <Heading titleParts={[{ text: "About Bright Tuition Care" }]} />
            <div className="flex flex-col gap-2 mt-2 lg:mt-4 text-neutral-45 text-lg leading-6 text-center lg:text-start">
              <p>
                At Bright Tuition Care, we are dedicated to connecting students
                with the most suitable and qualified tutors to{" "}
                <strong>support</strong> their learning journey. Whether you’re
                a student, guardian, or tutor, our goal is to make the tutoring
                experience simple, effective, and accessible for everyone.
              </p>
              <p>
                We believe that every learner deserves a quality education
                customized to their individual goals and learning style. That’s
                why we’ve built a trusted platform where finding the right tutor
                is quick, reliable, and <strong>hassle-free</strong>.
              </p>
              <p>
                From academic subjects to specialized skills, our network of
                verified and experienced tutors is committed to helping students
                reach their full potential.
              </p>
            </div>
            <div className="flex flex-row gap-4 mt-8 items-center justify-center lg:justify-start">
              <Link to={"/hire-a-tutor"}>
                <Button
                  label="Hire A Tutor"
                  variant="primary"
                  icon={ICONS.topRightArrow}
                />
              </Link>
              <Link to={"/signup"}>
                <Button
                  label="Become A Tutor"
                  variant="secondary"
                  icon={ICONS.topRightArrowWhite}
                  iconBg="#0D99FF"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default AboutUs;
