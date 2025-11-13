import React from "react";

interface ServiceCardProps {
  image: string;
  title: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title }) => {
  return (
    <div className="bg-white rounded-3xl font-Nunito w-full xl:w-[360px] h-fit flex flex-col gap-4 shadow-lg border border-neutral-45/20">
      <img
        src={image}
        alt={title}
        className="w-full object-cover h-[235px] rounded-t-3xl"
      />
      <div className="px-3 pb-4">
        <h3 className="text-2xl font-semibold text-neutral-10 text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ServiceCard;
