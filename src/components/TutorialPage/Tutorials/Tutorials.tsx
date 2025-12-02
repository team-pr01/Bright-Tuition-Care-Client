import { useState } from "react";
import TutorialCard from "../TutorialCard/TutorialCard";
import { motion } from "framer-motion";

const Tutorials = () => {
  const tutorialVideos = [
  // ✅ For Students / Guardians
  {
    _id: 1,
    title: "How to submit a tutor request",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Students/Guardians",
  },
  {
    _id: 2,
    title: "How to sign in to an account",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Students/Guardians",
  },
  {
    _id: 3,
    title: "How to update your profile",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Students/Guardians",
  },
  {
    _id: 4,
    title: "How to reset your account password",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Students/Guardians",
  },
  {
    _id: 5,
    title: "How to check your confirmation letter",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Students/Guardians",
  },
  {
    _id: 6,
    title: "How to send profile unlock request",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Students/Guardians",
  },

  // ✅ For Tutors
  {
    _id: 7,
    title: "How to sign in to an account",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Tutors",
  },
  {
    _id: 8,
    title: "How to update your profile",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Tutors",
  },
  {
    _id: 9,
    title: "How to reset your account password",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Tutors",
  },
  {
    _id: 10,
    title: "How to check your confirmation letter",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Tutors",
  },
  {
    _id: 11,
    title: "Payment methods for tutors",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Tutors",
  },
  {
    _id: 12,
    title: "How to submit a profile unlock request",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Tutors",
  },
  {
    _id: 13,
    title: "How to send a profile verification request",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Tutors",
  },
  {
    _id: 14,
    title: "How to apply for a tuition job",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For Tutors",
  },

  // ✅ For All
  {
    _id: 15,
    title: "How to sign in to an account",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For All",
  },
  {
    _id: 16,
    title: "How to update your profile",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For All",
  },
  {
    _id: 17,
    title: "How to reset your account password",
    videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU",
    forUser: "For All",
  },
];


  const [activeTab, setActiveTab] = useState("For All");
  const tabButtons = ["For All", "For Tutors", "For Students/Guardians"];

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="mt-16 md:mt-20">
      <div className="overflow-x-auto whitespace-nowrap flex items-center gap-5 scrollbar-hide">
        {tabButtons?.map((button) => (
          <button
            key={button}
            onClick={() => setActiveTab(button)}
            className={`px-4 py-2 hover:bg-primary-10 border border-primary-10 rounded-lg hover:text-white transition duration-300 cursor-pointer text-nowrap ${
              activeTab === button
                ? "bg-primary-10 text-white"
                : "bg-white text-primary-10"
            }`}
          >
            {button}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {tutorialVideos?.map((item, index) => (
          <motion.div
            key={item?._id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            transition={{ delay: index * 0.2 }}
          >
            <TutorialCard {...item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
