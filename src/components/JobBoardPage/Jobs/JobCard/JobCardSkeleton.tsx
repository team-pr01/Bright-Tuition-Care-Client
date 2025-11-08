import React from "react";

const JobCardSkeleton: React.FC = () => {
  return (
    <div className="px-3 py-3 md:px-5 bg-white shadow-job-card rounded-xl animate-pulse">
      {/* Title Row */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex-1">
          <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        </div>
        <div className="h-16 w-16 bg-gray-200 rounded-md"></div>
      </div>

      {/* Job Meta */}
      <div className="flex gap-5 mt-3">
        <div className="h-3 w-32 bg-gray-200 rounded"></div>
        <div className="h-3 w-40 bg-gray-200 rounded"></div>
      </div>

      {/* Subject */}
      <div className="flex gap-3 mt-4">
        <div className="h-5 w-5 bg-gray-200 rounded"></div>
        <div className="flex flex-col gap-2">
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
            <div className="flex flex-col gap-2 w-full">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Location */}
      <div className="flex gap-3 mt-4">
        <div className="h-5 w-5 bg-gray-200 rounded"></div>
        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-36 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between items-center mt-5">
        <div className="flex gap-4">
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 w-28 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
