/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion } from 'framer-motion';
import Container from '../../components/Reusable/Container/Container';
import Heading from '../../components/Reusable/Heading/Heading';
import TuitionRequestForm from '../../components/TuitionRequestPage/TuitionRequestForm/TuitionRequestForm';
const TuitionRequest = () => {
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
          titleParts={[{ text: "Request for Tutor" }]}
          description="Please fill the form below to request for a tutor. We will review your request and get back to you as soon as possible."
          align="center"
          headingClassName="text-center"
        />
          {/* Animated Form */}
          <motion.div
            variants={fromLeftVariant}
            initial="hidden"
            animate="visible"
          >
            <TuitionRequestForm />
          </motion.div>
      </div>
    </Container>
    );
};

export default TuitionRequest;