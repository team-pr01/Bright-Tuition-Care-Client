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
  rating,
  variant = "default", // Default variant
}) => {
  return (
    <div
      className={`flex flex-col ${
        variant == "default" ? "md:flex-row" : "md:flex-row-reverse"
      } font-Nunito items-center justify-between gap-3 md:gap-10 xl:gap-16 rounded-xl w-full lg:w-[80%] mx-auto`}
    >
      {/* Profile Image */}
      <div className="relative min-w-[286px]">
        <div className=" w-[286px] h-[348px] bg-primary-10 rounded-xl z-0"></div>
        <img
          src={image}
          alt={name}
          className="absolute -top-[15px] -right-[26px] z-10 rounded-[70px] w-[286px] h-[348px] object-cover p-2 bg-white shadow-md"
        />
      </div>

      {/* Name and Role */}
      <div className="flex md:hidden flex-col gap-3 mt-5 lg:mt-0">
        <div>
        <p className="font-bold text-neutral-10 mb-1 text-xl leading-[24px]">
          {name}
        </p>
        <p className="text-lg text-neutral-10 leading-[24px]">{role}</p>
      </div>

      <div className="flex items-center gap-1 ">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={i < rating ? "#FACC15" : "#E5E7EB"} // yellow-400 or gray-200
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      </div>
      {/* Text Section */}

      <div className="flex-1 text-left">
        <div className="flex flex-col items-start gap-7">
          <div className="flex flex-col items-start gap-3">
            <img
              className="size-[50px]"
              src={ICONS.testimonials}
              alt="testimonials"
            />
            <p className="text-neutral-10 text-xl font-medium text-center md:text-start">{review}</p>
          </div>

          {/* Rating */}
          <div className="hidden md:flex items-center gap-1 ">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < rating ? "#FACC15" : "#E5E7EB"} // yellow-400 or gray-200
                viewBox="0 0 24 24"
                className="w- h-5"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>

          {/* Name and Role */}
          <div className="hidden md:block">
            <p className="font-bold text-neutral-10 mb-1 text-xl leading-[24px]">
              {name}
            </p>
            <p className="text-lg text-neutral-10 leading-[24px]">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
