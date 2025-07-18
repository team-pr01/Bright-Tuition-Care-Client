import React from "react";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-[10px] font-Nunito w-[360px] h-[347px] flex flex-col gap-4">
      <img src={image} alt={title} className="w-full h-[211px] object-cover rounded-[10px]" />
      <div className=" flex flex-col gap-3 px-3 pb-4 text-left ">
        <h3 className="text-2xl font-semibold text-neutral-10">{title}</h3>
        <p className="text-neutral-20 text-lg leading-[24px] mt-2">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
