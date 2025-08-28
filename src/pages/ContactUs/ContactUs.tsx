/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import ContactUsForm from "../../components/ContactUsPage/ContactUsForm/ContactUsForm";
import Container from "../../components/Reusable/Container/Container";
import Heading from "../../components/Reusable/Heading/Heading";

const ContactUs = () => {
  const fromLeftVariant:any = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Container>
      <div className="mt-10 mb-72 lg:mb-96 flex flex-col gap-5 lg:gap-10">
        <Heading
          titleParts={[{ text: "Contact Us" }]}
          description="Have a question, feedback, or need help? Our team is here to assist you."
          align="center"
          headingClassName="text-center"
        />
          {/* Animated Form */}
          <motion.div
            variants={fromLeftVariant}
            initial="hidden"
            animate="visible"
          >
            <ContactUsForm />
          </motion.div>
      </div>
    </Container>
  );
};

export default ContactUs;