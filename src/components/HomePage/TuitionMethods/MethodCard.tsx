import React from "react";

interface MethodCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const MethodCard: React.FC<MethodCardProps> = ({
  number,
  icon,
  title,
  description,
}) => {
  return (
    <div className="border-2 relative font-Nunito border-primary-30 rounded-xl py-8 px-4 flex flex-col items-center text-center bg-white w-full gap-2 h-[286px]">
      <div className="absolute top-0 left-0 text-sm bg-primary-20 rounded-tl-xl text-primary-40 font-semibold mb-2 py-2 pr-3 pl-[10px]">
        <p>{number}</p>
      </div>
      <div className=" bg-primary-40 rounded-full flex justify-center items-center mt-[6px] size-15">
        <img
          src={typeof icon === "string" ? icon : undefined}
          className="size-8"
        />
      </div>

      <h3 className="text-xl leading-[24px] font-bold text-primary-10">
        {title}
      </h3>
      <p className="text-lg text-neutral-30">{description}</p>
    </div>
  );
};

export default MethodCard;
