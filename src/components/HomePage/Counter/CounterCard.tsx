import React from "react";

interface CounterCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const CounterCard: React.FC<CounterCardProps> = ({ icon, value, label }) => {
  return (
    <div className="flex flex-row font-Nunito items-center gap-5 text-center min-w-[200px]">
      <img
        src={typeof icon === "string" ? icon : undefined}
        className="size-[56px]"
      />
      <div className="flex flex-col gap-2 justify-between items-start">
        <p className="text-2xl font-semibold text-primary-50 leading-[32px]">
          {value}
        </p>
        <p className="text-neutral-10 leading-[24px] font-medium">{label}</p>
      </div>
    </div>
  );
};

export default CounterCard;
