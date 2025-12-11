/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IMAGES } from "../../../assets";

interface TutorOfTheMonthProps {
  tutor: any;
  className?: string;
}

const TutorOfTheMonth: React.FC<TutorOfTheMonthProps> = ({
  tutor,
  className = "",
}) => {
  return (
    <div
      className={`bg-gradient-to-r from-primary-10 to-primary-30 rounded-2xl overflow-hidden border border-gray-100 font-Nunito relative h-[285px] ${className}`}
    >
      <img
        src={IMAGES.tutorOfTheMonthBg}
        alt=""
        className="absolute w-full h-full"
      />
      <div className="relative w-full h-full">
        <img
          src={IMAGES.tutorOfTheMonthLabel}
          alt=""
          className="absolute w-[130px] top-3 left-1/2 -translate-x-1/2"
        />
        {/* Image and badge */}
        <div className="absolute top-[70px] left-1/2 -translate-x-1/2">
          <div className="relative rounded-full size-28">
            {/* User image */}
              <div className="rounded-full size-28 border-4 border-primary-10 flex items-center justify-center">
                <img
                  src={tutor?.imageUrl || IMAGES.dummyAvatar}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            <img
              src={IMAGES.tutorOfTheMonthBadge}
              alt=""
              className="w-10 -right-4 top-14 absolute"
            />
          </div>
        </div>

        <div className="bg-primary-10 w-fit px-2 py-1 rounded-3xl text-center absolute top-[190px] left-1/2 -translate-x-1/2 z-10">
          <p className="text-neutral-5 text-sm md:text-base font-bold">
            {tutor?.userId?.name}
          </p>
        </div>

        <div className="rounded-t-4xl border-t-3 rounded-b-2xl border-primary-10 bg-primary-50 w-full h-20 absolute bottom-0 text-center">
          <p className="text-xs md:text-sm text-gray-200 font-semibold text-center mt-5">
            Id : {tutor?.tutorId} | Rating : {tutor?.rating}/5
          </p>
          <h2 className="text-white text-sm md:text-xl font-bold mt-2 md:mt-0">
            BEST TUTOR OF THE MONTH{" "}
            <span className="text-[8px] md:text-[10px] font-normal bg-primary-10 p-1 rounded-xl">
              {new Date().toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};
export default TutorOfTheMonth;
