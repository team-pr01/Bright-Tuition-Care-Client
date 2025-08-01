/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { IMAGES } from "../../assets";
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

  const fromRightVariant:any = {
    hidden: { x: 100, opacity: 0 },
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
      <div className="mt-10 mb-72 lg:mb-96">
        <Heading
          titleParts={[{ text: "Contact Us" }]}
          description="Have a question, feedback, or need help? Our team is here to assist you."
          align="center"
          headingClassName="text-center"
        />
        <div className="flex flex-col gap-10 lg:flex-row mt-20">
          {/* Animated Form */}
          <motion.div
            className="w-full lg:w-[60%]"
            variants={fromLeftVariant}
            initial="hidden"
            animate="visible"
          >
            <ContactUsForm />
          </motion.div>

          {/* Image */}
          <motion.div
            className="p-10 md:p-20 lg:p-10 xl:p-20 w-full lg:w-[40%] flex items-center justify-center"
            variants={fromRightVariant}
            initial="hidden"
            animate="visible"
          >
            <img src={IMAGES.contactUs} alt="Contact Us Illustration" className="" />
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;