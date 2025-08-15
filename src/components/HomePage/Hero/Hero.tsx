/* eslint-disable @typescript-eslint/prefer-as-const */
import { motion } from "framer-motion";
import { ImWhatsapp } from "react-icons/im";
import { IMAGES } from "../../../assets";
import AnimatedButton from "../../Reusable/AnimatedButton/AnimatedButton";
import Container from "../../Reusable/Container/Container";
import { Link } from "react-router-dom";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as "spring",
        stiffness: 100,
      },
    },
  };

  const paragraphVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as "spring",
        stiffness: 100,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as "spring",
        duration: 1.5,
      },
    },
  };

  return (
    <Container>
  <div className="flex flex-col gap-8 lg:gap-[44px] lg:flex-row font-Nunito h-fit justify-between py-5 lg:py-[84px] overflow-hidden">
    {/* Left Content */}
    <motion.div
      className="w-full lg:w-[55%] flex flex-col justify-start mt-5 lg:mt-16 overflow-hidden" // add overflow-hidden here
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3"
      >
        <ImWhatsapp className="text-green-500 text-xl" />
        <a
          href="tel:+8801616012365"
          className="text-lg text-neutral-10 font-semibold leading-[24px]"
        >
          +880 1616-012365
        </a>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-neutral-10 text-2xl lg:text-[56px] font-bold leading-8 lg:leading-[68px] mt-4"
      >
        Find The Best <span className="text-primary-40">Tutor</span> Today
      </motion.h1>

      <motion.p
        variants={paragraphVariants}
        className="text-neutral-10 text-sm lg:text-lg leading-normal lg:leading-6 max-w-full lg:max-w-[600px] mt-4"
      >
        Whether you're a student seeking expert guidance or a tutor looking
        for new opportunities — our platform connects you in just a few
        clicks. Learn smarter. Teach better.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-5 mt-7 lg:mt-12 items-start md:items-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <AnimatedButton />
        </motion.div>
        <p className="font-lg leading-[24px] text-neutral-20">
          Want to become a Tutor?{" "}
          <Link
            to="/signup"
            className="font-semibold bg-gradient-to-r from-primary-10 to-primary-40/60 bg-clip-text text-transparent cursor-pointer"
          >
            Sign Up <span className="text-neutral-20 font-normal">Now</span>
          </Link>
        </p>
      </motion.div>
    </motion.div>

    {/* Right Image */}
    <motion.div
      className="w-full lg:w-[35%] overflow-hidden" // add overflow-hidden here
      variants={imageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <img src={IMAGES.heroImg} alt="Hero Section" className="w-full" />
    </motion.div>
  </div>
</Container>

  );
};

export default Hero;
