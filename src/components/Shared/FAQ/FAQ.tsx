import Container from "../../Reusable/Container/Container";
import { motion, type Variants } from "framer-motion";
import Heading from "../../Reusable/Heading/Heading";
import Accordion from "./Accordion";

const FAQ = () => {
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
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
            titleParts={[
              { text: "Frequently Asked Questions" },
            ]}
            description={
              "Finding the right tutor is easier than ever. Follow these simple steps to connect with the best educators for your child."
            }
            align="center"
          />
        </motion.div>
        <Accordion/>
      </Container>
    </div>
  );
};

export default FAQ;