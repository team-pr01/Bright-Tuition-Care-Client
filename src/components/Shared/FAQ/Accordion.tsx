import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const Accordion = ({ activeTab }: { activeTab: string }) => {
  const [isAccordingOpen, setIsAccordingOpen] = useState<number | null>(0);

  const handleClick = (index: number) =>
    setIsAccordingOpen((prevIndex) => (prevIndex === index ? null : index));

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const faqForTutor = [
    {
      title: "Are you SEBI-registered?",
      description:
        "Yes. Amandeep Singh Juneja is a SEBI-Registered Investment Adviser (RIA). Registration number will appear on every invoice and email once issued.",
    },
    {
      title: "Do you give stock tips?",
      description:
        "No. We teach frameworks and offer goal-based advice. No intraday or speculative calls in any paid or free channel.",
    },
    {
      title: "How are you compensated?",
      description:
        "100% fee-only. We do not accept commissions, referral fees, or brokerage kick-backs.",
    },
    {
      title: "Can I get a refund on a digital course?",
      description:
        "Digital products are non-refundable once access is granted (see Refund Policy).",
    },
    {
      title: "How is my data protected?",
      description:
        "We follow industry-standard encryption, store data on secure servers, and never sell personal info. Full details in our Privacy Policy.",
    },
    {
      title: "Is NPS / PPF / ELSS right for me?",
      description:
        "It depends on your goals, horizon, and risk profile. Book a 1-on-1 session or complete our risk-profiling questionnaire for personalised advice.",
    },
  ];

  const faqForGuardianOrStudents = [
    {
      title: "Can I get a refund on a digital course?",
      description:
        "Digital products are non-refundable once access is granted (see Refund Policy).",
    },
    {
      title: "How is my data protected?",
      description:
        "We follow industry-standard encryption, store data on secure servers, and never sell personal info. Full details in our Privacy Policy.",
    },
    {
      title: "Is NPS / PPF / ELSS right for me?",
      description:
        "It depends on your goals, horizon, and risk profile. Book a 1-on-1 session or complete our risk-profiling questionnaire for personalised advice.",
    },
  ];

  const accordionData =
    activeTab === "For Tutors" ? faqForTutor : faqForGuardianOrStudents;

  return (
    <motion.div
      className="flex gap-3 flex-col w-full mt-16"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {accordionData?.map((according, index) => (
        <motion.article
          key={index}
          className="border-b border-neutral-45/30 py-5 hover:border-primary-10 transform duration-300"
          variants={itemVariants}
          layout
        >
          <motion.div
            className="flex gap-2 cursor-pointer items-center justify-between w-full"
            onClick={() => handleClick(index)}
          >
            <h2 className="text-neutral-10 font-medium leading-[22px]">
              {according.title}
            </h2>
            <p>
              <IoChevronDownSharp
                className={`text-[1.2rem] text-text transition-all duration-300 ${
                  isAccordingOpen === index && "rotate-[180deg] text-primary-10"
                }`}
              />
            </p>
          </motion.div>

          <AnimatePresence initial={false}>
            {isAccordingOpen === index && (
              <motion.section
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", marginTop: "16px" },
                  collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <p className="text-neutral-30 text-sm leading-5">
                  {according.description}
                </p>
              </motion.section>
            )}
          </AnimatePresence>
        </motion.article>
      ))}
    </motion.div>
  );
};

export default Accordion;
