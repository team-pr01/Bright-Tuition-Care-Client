// components/TutorSteps/TutorStepCard.tsx

import React from "react";

export interface TutorStepCardProps {
  step: number;
  title: string;
  description: string;
  align: "left" | "right";
}

const TutorStepCard: React.FC<TutorStepCardProps> = ({ step, title, description, align }) => {
  const isLeft = align === "left";

  return (
    <div className={`flex w-[968px] font-Nunito max-w-[968px] h-[222px] p-[30px] ${isLeft ? "justify-start" : "justify-end"}`}>
      <div className="w-full md:w-[48%] bg-white rounded-lg shadow-md p-5">
        <div className="flex flex-col items-center gap-5 mb-2">
          <div className="bg-primary-20 text-white font-bold w-[] h-8 flex items-center justify-center rounded">
            {step}
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        </div>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </div>
  );
};

export default TutorStepCard;
