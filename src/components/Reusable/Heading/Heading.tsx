/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";

interface TitlePart {
  text: string;
  highlight?: boolean; // true if the word should be styled differently
}

interface HeadingProps {
  titleParts: TitlePart[];
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  headingClassName?: string;
  descriptionClassName?: string;
}

const Heading: React.FC<HeadingProps> = ({
  titleParts,
  description,
  align = "left",
  className = "",
  headingClassName = "",
  descriptionClassName = "",
}) => {
  const alignment =
    align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : "text-left";

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
      className={`${alignment} ${className} font-Nunito`}
    >
      <motion.div variants={itemVariants}>
        <h1
          className={`text-2xl lg:text-[38px] font-Nunito font-semibold lg:font-bold text-neutral-10 leading-8 2xl:leading-12 ${headingClassName}`}
        >
          {titleParts.map((part, index) => (
            <span key={index} className={part.highlight ? "text-blue-600" : ""}>
              {part.text}{" "}
            </span>
          ))}
        </h1>
      </motion.div>

      {description && (
        <motion.p
          variants={itemVariants}
          className={`mt-4 text-neutral-20 leading-[24px] max-w-[749px] mx-auto ${descriptionClassName}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Heading;
