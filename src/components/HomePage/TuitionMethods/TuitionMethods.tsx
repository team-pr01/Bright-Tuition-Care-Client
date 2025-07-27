import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { methods } from "./TuitionMethods.dt";
import MethodCard from "./MethodCard";
import Heading from "../../Reusable/Heading/Heading";
import Container from "../../Reusable/Container/Container";

const TuitionMethods: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full py-[50px] font-Nunito">
      <Container>
        <div className="text-center">
          <Heading
            titleParts={[{ text: "Tuition Method" }]}
            description="We offer multiple flexible learning options to suit every student’s needs — whether it’s personal, online, in groups, or structured packages."
            align="center"
          />

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center gap-4 xl:gap-8 mt-6 lg:mt-8"
          >
            {methods.map((method, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MethodCard
                  number={method.number}
                  icon={method.icon}
                  title={method.title}
                  description={method.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default TuitionMethods;
