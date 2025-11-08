/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useRef } from "react";
import StepCard from "./StepCard";
import Container from "../../Reusable/Container/Container";
import { IMAGES } from "../../../assets";
import Heading from "../../Reusable/Heading/Heading";
import { studentOrGuardianSteps } from "../../../constants/stepsData";

const StudentSteps = () => {
  const ref = useRef(null);

  const lineVariants: any = {
    hidden: { opacity: 0, scaleX: 0.5 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  const stepsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  const stepItemVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-[50px] w-full overflow-hidden"
      style={{
        background: "linear-gradient(101deg, #FFF -7.84%, #E8F3FF 74.03%)",
      }}
    >
      <Container>
        <div>
          <Heading
            titleParts={[
              { text: "How The System Works For Guardian/Students?" },
            ]}
            description={
              "Finding the right tutor is easier than ever. Follow these simple steps to connect with the best educators for your child."
            }
            align="center"
          />
          <motion.div
            className="relative mt-9"
            initial="hidden"
            whileInView="visible"
          >
            {/* dotted line */}
            <motion.img
              src={IMAGES.stepLine}
              alt="Connector line"
              className="hidden md:block absolute top-7 left-0 right-0 mx-auto z-0 w-[80%] max-w-[90%] object-contain"
              variants={lineVariants}
            />

            <motion.div
              variants={stepsContainerVariants}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-12 relative z-10"
            >
              {studentOrGuardianSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={stepItemVariants}
                  className={`relative ${
                    index === 1
                      ? "mt-0 lg:mt-17"
                      : index === 2
                      ? "mt-0 lg:mt-3"
                      : index === 3
                      ? "mt-0 lg:mt-19"
                      : "mt-0 lg:mt-5"
                  }`}
                >
                  <StepCard {...step} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default StudentSteps;
