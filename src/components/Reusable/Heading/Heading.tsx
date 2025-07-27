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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time delay between children animations
      },
    },
  };

  const itemVariants = {
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
      className={`${alignment} ${className} font-Nunito`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is in view
    >
      <motion.h1
        variants={itemVariants}
        className={`text-2xl lg:text-[44px] font-Nunito font-semibold lg:font-bold text-neutral-10 leading-8 lg:leading-12 ${headingClassName}`}
      >
        {titleParts.map((part, index) => (
          <span key={index} className={part.highlight ? "text-blue-600" : ""}>
            {part.text}{" "}
          </span>
        ))}
      </motion.h1>
      {description && (
        <motion.p
          variants={itemVariants}
          className={`mt-4 text-neutral-20 text-lg leading-[24px] max-w-[749px] mx-auto ${descriptionClassName}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Heading;