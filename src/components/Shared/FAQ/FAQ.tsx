import Container from "../../Reusable/Container/Container";
import { motion, type Variants } from "framer-motion";
import Heading from "../../Reusable/Heading/Heading";
import Accordion from "./Accordion";
import { useState } from "react";

const FAQ = () => {
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const [activeTab, setActiveTab] = useState<string>("For Tutors");

  const tabButtons = ["For Tutors", "For Guardian/Students"];
  return (
    <div className="bg-gradient-course font-Montserrat">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <Heading
            titleParts={[{ text: "Frequently Asked Questions" }]}
            description={
              "Finding the right tutor is easier than ever. Follow these simple steps to connect with the best educators for your child."
            }
            align="center"
          />
        </motion.div>

        {/* Tab buttons */}
        <div className="flex items-center justify-center gap-4 mb-2 mt-8">
          {tabButtons?.map((button) => (
            <button
              key={button}
              onClick={() => setActiveTab(button)}
              type="button"
              className={` rounded-3xl text-sm md:text-base px-3 py-2 flex items-center gap-3 border cursor-pointer transition duration-300 ${
                button === activeTab
                  ? "bg-primary-10 text-white border-primary-10"
                  : "bg-white hover:bg-primary-10/10 text-neutral-20 border-neutral-45/20"
              }`}
            >
              {button}
            </button>
          ))}
        </div>
        <Accordion activeTab={activeTab} />
      </Container>
    </div>
  );
};

export default FAQ;
