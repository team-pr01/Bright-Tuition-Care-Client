import React from "react";
import { FaCalendarAlt, FaStar, FaTrophy } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { IMAGES } from "../../../assets";

interface TutorOfTheMonthProps {
  tutor: {
    id: string;
    name: string;
    rating: number;
    title: string;
    month: string;
    year: string;
  };
  className?: string;
}

const TutorOfTheMonth: React.FC<TutorOfTheMonthProps> = ({
  tutor,
  className = "",
}) => {
  const { id, name, rating, title, month, year } = tutor;

  return (
    <div
      className={`bg-gradient-to-r from-primary-10 to-primary-30 rounded-2xl overflow-hidden border border-gray-100 p-4 font-Nunito ${className}`}
    >
      {/* Header with ribbon */}
      <div className="bg-white text-primary-10 px-6 py-1.5 rounded-full shadow-lg flex items-center justify-center gap-2 text-center w-fit mx-auto text-xs">
        <FaTrophy />
        <span className="font-bold tracking-wide">TUTOR OF THE MONTH</span>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6 mt-2">
        {/* Left: Avatar & Stats */}
        <div className="flex-shrink-0">
          {/* Avatar with crown */}
          <div className="relative">
            <div className="size-32 rounded-full flex items-center justify-center text-white bg-gray-100 text-4xl font-bold shadow-lg border-2 border-white">
              <img src={IMAGES.dummyAvatar} alt="" className="rounded-full" />
            </div>

            {/* Verified badge */}
            <div className="absolute -bottom-0 right-2 bg-white text-primary-10 p-1.5 rounded-full shadow-lg">
              <MdVerified className="text-lg" />
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1">
          {/* Name & Title */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
              <span className="text-xs bg-white text-primary-10 px-2 py-1 rounded-full font-medium">
                ID: {id}
              </span>
            </div>
            <div className="text-lg font-semibold text-gray-700">{title}</div>
          </div>

          {/* Month/Year & Rating */}
          <div className="flex items-center gap-4 text-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
              <FaCalendarAlt className="text-purple-500" />
              <span className="font-semibold">
                {month} {year}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-500 rounded-full">
              <FaStar />
              <span className="">{rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Quote */}
          {/* {quote && (
              <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                <div className="flex gap-3">
                  <FaQuoteLeft className="text-gray-300 text-xl flex-shrink-0 mt-1" />
                  <p className="text-gray-600 italic">"{quote}"</p>
                </div>
              </div>
            )} */}
        </div>
      </div>
    </div>
  );
};
export default TutorOfTheMonth;
