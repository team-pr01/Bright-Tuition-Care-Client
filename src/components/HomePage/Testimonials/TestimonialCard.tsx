import React, { useState } from "react";
import { ICONS } from "../../../assets";
import type { TTestimonial } from "../../../types/testimonial.types";

interface TestimonialCardProps {
  testimonial?: TTestimonial;
  variant?: "default" | "primary";
  isLoading?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  variant = "default",
  isLoading = false,
}) => {
  const [showFull, setShowFull] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div
        className={`flex flex-col ${
          variant === "default" ? "" : ""
        } items-center justify-between gap-3 rounded-xl w-full lg:w-[80%] mx-auto pt-32 relative z-9999`}
      >
        <div className="flex flex-col items-start gap-3 bg-gray-100 p-5 rounded-2xl relative w-full animate-pulse">
          {/* Profile skeleton */}
          <div className="flex flex-col gap-4 items-center justify-center absolute left-0 right-0 -top-32 z-50">
            <div className="size-[200px] rounded-full bg-gray-200" />
            <div className="space-y-2 text-center">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Text skeleton */}
          <div className="mt-32 relative z-10 flex flex-col items-center gap-3 w-full">
            <div className="h-10 w-10 bg-gray-200 rounded-full" />
            <div className="h-4 w-[80%] bg-gray-200 rounded" />
            <div className="h-4 w-[90%] bg-gray-200 rounded" />
            <div className="h-4 w-[60%] bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const isLong = (testimonial?.review ?? "").length > 150;
  const displayText = showFull
    ? testimonial?.review ?? ""
    : (testimonial?.review ?? "").slice(0, 150) + (isLong ? "..." : "");

  return (
    <div
      className={`flex flex-col ${
        variant === "default" ? "" : ""
      } font-Nunito items-center justify-between gap-3 rounded-xl w-full lg:w-[80%] mx-auto overflow-y-visible pt-20 relative z-9999`}
    >
      <div className="flex flex-col items-start gap-3 bg-primary-10/10 p-5 rounded-2xl relative w-full">
        {/* Profile */}
        <div className="flex flex-col gap-4 items-center justify-center absolute left-0 right-0 -top-20 z-50">
          <div className="size-[150px] rounded-full bg-white flex items-center justify-center p-[3px] shadow-md">
            <div className="p-[3px] bg-primary-10 rounded-full w-full h-full">
              <div className="p-[3px] bg-white rounded-full w-full h-full">
                <img
                  src={testimonial?.imageUrl}
                  alt={testimonial?.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold text-neutral-10 mb-1 text-xl text-center leading-[24px]">
              {testimonial?.name}
            </p>
            <p className="text-lg text-neutral-10 leading-[24px]">
              {testimonial?.designation}
            </p>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < (testimonial?.rating ?? 0) ? "#FACC15" : "#E5E7EB"}
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="mt-32 relative z-10">
          <img
            className="size-[50px]"
            src={ICONS.testimonials}
            alt="testimonials"
          />
          <p className="text-neutral-10 text-base md:text-xl font-medium text-center">
            "{displayText}"
            {isLong && (
              <button
                onClick={() => setShowFull(!showFull)}
                className="text-primary-10 text-sm underline cursor-pointer pointer-events-auto relative z-[60]"
                type="button"
              >
                {showFull ? "See Less" : "See More"}
              </button>
            )}
          </p>
        </div>
      </div>
      {/* <ReviewModal
        isReviewModalOpen={isReviewModalOpen}
        setIsReviewModalOpen={setIsReviewModalOpen}
        review={testimonial?.review}
      /> */}
    </div>
  );
};

export default TestimonialCard;
