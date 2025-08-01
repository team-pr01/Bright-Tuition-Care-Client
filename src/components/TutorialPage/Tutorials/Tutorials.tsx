import { useState } from "react";

const Tutorials = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabButtons = ["All", "For Tutors", "For Students/Guardians"];
  return (
    <div className="mt-8">
      <div className="flex items-center gap-5">
        {tabButtons?.map((button: string) => (
          <button
            key={button}
            onClick={() => setActiveTab(button)}
            className={`px-4 py-2  hover:bg-primary-10 border border-primary-10 rounded-lg  hover:text-white transition duration-300 cursor-pointer ${
              activeTab === button
                ? "bg-primary-10 text-white"
                : "bg-white text-primary-10"
            }`}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
