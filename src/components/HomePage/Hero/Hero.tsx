/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImWhatsapp } from "react-icons/im";
import { IMAGES } from "../../../assets";
import AnimatedButton from "../../Reusable/AnimatedButton/AnimatedButton";
import Container from "../../Reusable/Container/Container";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Animation variants
const containerVariants:any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants:any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const floatingAnimation:any = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const staggeredFloating:any = (delay:any) => ({
  animate: {
    y: [-8, 12, -8],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  }
});

const scaleInAnimation:any = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <Container>
      <motion.div
        ref={ref}
        className="flex flex-col gap-8 lg:gap-[44px] lg:flex-row font-Nunito h-fit items-center justify-between py-5 lg:py-[84px]"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Left Content */}
        <motion.div 
          className="w-full lg:w-[55%] flex flex-col justify-start mt-5 lg:mt-16"
          variants={itemVariants}
        >
          <motion.div 
            className="flex items-center gap-3"
            variants={itemVariants}
          >
            <ImWhatsapp className="text-green-500 text-xl" />
            <a
              href="tel:+8801616012365"
              className="text-lg text-neutral-10 font-semibold leading-[24px] hover:text-green-500 transition-colors duration-300"
            >
              +880 1616-012365
            </a>
          </motion.div>

          <motion.h1 
            className="text-neutral-10 text-2xl lg:text-[56px] font-bold leading-8 lg:leading-[68px] mt-4"
            variants={itemVariants}
          >
            Find The Best <span className="text-primary-40">Tutor</span> Today
          </motion.h1>

          <motion.p 
            className="text-neutral-10 text-sm lg:text-lg leading-normal lg:leading-6 max-w-full lg:max-w-[600px] mt-4"
            variants={itemVariants}
          >
            Whether you're a student seeking expert guidance or a tutor looking
            for new opportunities — our platform connects you in just a few
            clicks. Learn smarter. Teach better.
          </motion.p>

          <motion.div 
            className="flex flex-col md:flex-row gap-5 mt-7 lg:mt-12 items-start md:items-center"
            variants={itemVariants}
          >
            <AnimatedButton />
            <p className="font-lg leading-[24px] text-neutral-20">
              Want to become a Tutor?{" "}
              <Link
                to="/signup"
                className="font-semibold bg-gradient-to-r from-primary-10 to-primary-40/60 bg-clip-text text-transparent cursor-pointer hover:from-primary-40 hover:to-primary-10 transition-all duration-300"
              >
                Sign Up <span className="text-neutral-20 font-normal">Now</span>
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Right Image - Keeping your exact positioning */}
        <div className="w-full lg:w-[35%] flex items-center justify-center">
          <motion.div 
          className="relative"
          variants={scaleInAnimation}
        >
          {/* Top Row - Same as your original */}
          <div className="flex items-center">
            <motion.div
              variants={floatingAnimation}
              animate="animate"
            >
              <img
                src={IMAGES.heroImg2}
                alt="Hero Section"
                className="w-[180px]  rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              />
            </motion.div>
            <motion.div
              variants={staggeredFloating(0.5)}
              animate="animate"
            >
              <img
                src={IMAGES.heroImg1}
                alt="Hero Section"
                className="w-[180px]  rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              />
            </motion.div>
          </div>

          {/* Bottom Row - Same absolute positioning as your original */}
          <div className="flex items-center absolute left-[87px] top-40 w-full">
            <motion.div
              variants={staggeredFloating(1)}
              animate="animate"
            >
              <img
                src={IMAGES.heroImg3}
                alt="Hero Section"
                className="w-[180px]  rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              />
            </motion.div>
            <motion.div
              variants={staggeredFloating(1.5)}
              animate="animate"
            >
              <img
                src={IMAGES.heroImg4}
                alt="Hero Section"
                className="w-[180px]  rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              />
            </motion.div>
          </div>
        </motion.div>
        </div>
      </motion.div>
    </Container>
  );
};

export default Hero;