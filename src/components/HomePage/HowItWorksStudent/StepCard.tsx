// components/SystemSteps/StepCard.tsx

import React from "react";

interface StepCardProps {
  icon: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className="text-center flex flex-col font-Nunito items-center max-w-xs mx-auto px-4 relative">
      <div className="bg-primary-10 p-4 rounded-full flex items-center justify-center w-15 h-15 mb-9">
        <img src={icon} alt={title} className="size-8" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-10">{title}</h3>
      <p className="text-sm text-neutral-10 mt-4">{description}</p>
    </div>
  );
};

export default StepCard;
