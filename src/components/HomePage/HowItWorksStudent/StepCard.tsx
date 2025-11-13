// components/SystemSteps/StepCard.tsx

import React from "react";

interface StepCardProps {
  icon: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className="text-center flex flex-col font-Nunito items-center max-w-xs mx-auto relative">
      <div className="bg-primary-10 p-4 rounded-full flex items-center justify-center size-15">
        <img src={icon} alt={title} className="size-8" />
      </div>
      <h3 className="text-lg font-semibold text-primary-10 mt-3 ">{title}</h3>
      <p className="text-sm text-neutral-10 mt-3 lg:mt-0 2xl:mt-4">
        {description}
      </p>
    </div>
  );
};

export default StepCard;
