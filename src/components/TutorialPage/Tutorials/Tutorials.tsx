import { useState } from "react";
import TutorialCard from "../TutorialCard/TutorialCard";

const Tutorials = () => {
  const tutorialVideos = [
    {
      _id: 1,
      title: "How to send tutor request",
      description:
        "Learn how to send a detailed tutor request to find the best educator for your needs.",
      videoUrl: "https://www.youtube.com/embed/FzOGKQK-1PU?si=EYGmNjIx97WWJ6Tr",
    },
    {
      _id: 2,
      title: "Getting Started with Online Learning",
      description:
        "A beginner’s guide to navigating the online learning platform effectively.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      _id: 3,
      title: "Top 5 Tips for Effective Study",
      description:
        "Boost your learning productivity with these essential study tips.",
      videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    },
    {
      _id: 4,
      title: "How to Choose the Right Tutor",
      description:
        "Understand key factors to consider when selecting a tutor for your academic goals.",
      videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    },
    {
      _id: 5,
      title: "Navigating the Student Dashboard",
      description:
        "Step-by-step tutorial on how to use your dashboard to access courses and track progress.",
      videoUrl: "https://www.youtube.com/embed/L_jWHffIx5E",
    },
  ];

  const [activeTab, setActiveTab] = useState("All");
  const tabButtons = ["All", "For Tutors", "For Students/Guardians"];
  return (
    <div className="mt-16 md:mt-20">
      <div className="overflow-x-auto whitespace-nowrap flex items-center gap-5 scrollbar-hide">
        {tabButtons?.map((button: string) => (
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
        {tutorialVideos?.map((item) => (
          <TutorialCard key={item?._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
