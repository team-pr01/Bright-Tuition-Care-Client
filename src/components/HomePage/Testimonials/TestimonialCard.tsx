import React from "react";
import { ICONS } from "../../../assets";

interface TestimonialCardProps {
  image: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  variant?: "default" | "primary"; // Optional variant prop for future use
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  image,
  name,
  role,
  review,
  variant = "default",
}) => {
  return (
    <div
      className={`flex flex-col ${
        variant == "default" ? "" : ""
      } flex-col font-Nunito items-center justify-between gap-3 rounded-xl w-full lg:w-[80%] mx-auto overflow-y-visible pt-32`}
    >
      {/* Rating */}
      {/* <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={i < rating ? "#FACC15" : "#E5E7EB"}
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div> */}

      <div className="flex flex-col items-start gap-3 bg-primary-10/10 p-5 rounded-2xl relative">
        {/* Profile */}
        <div className="flex flex-col gap-4 items-center justify-center absolute left-0 right-0 -top-32 z-50">
          {/* Profile Image */}
          <div className="size-[200px] rounded-full bg-white flex items-center justify-center p-[3px] shadow-md">
            <div className="p-[3px] bg-primary-10 rounded-full w-full h-full">
              <div className="p-[3px] bg-white rounded-full w-full h-full">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Name and Role */}
          <div className="">
            <p className="font-bold text-neutral-10 mb-1 text-xl leading-[24px]">
              {name}
            </p>
            <p className="text-lg text-neutral-10 leading-[24px]">{role}</p>
          </div>
        </div>

        <div className="mt-32 ">
          <img
            className="size-[50px]"
            src={ICONS.testimonials}
            alt="testimonials"
          />
          <p className="text-neutral-10 text-base md:text-xl font-medium text-center">
            "{review}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
