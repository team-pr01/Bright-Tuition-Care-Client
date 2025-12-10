/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetAllJobByGuardianIdQuery } from "../../../../redux/Features/Job/jobApi";
import {
  FiSend,
  FiStar,
  FiCheckCircle,
  FiXCircle,
  FiCornerUpLeft,
} from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import Jobs from "../../../../components/JobBoardPage/Jobs/Jobs";
import JobCardSkeleton from "../../../../components/JobBoardPage/Jobs/JobCard/JobCardSkeleton";

const GuardianPostedJobs = () => {
  const { id } = useParams();   
  const [activeTab, setActiveTab] = useState<string>("");
  // Pagination states
  const [skip, setSkip] = useState<number>(0);
  const limit = 6;
  const [jobs, setJobs] = useState<any[]>([]);
  const {
    data: guardianPostedJobs,
    isLoading: isJobsLoading,
    isFetching,
  } = useGetAllJobByGuardianIdQuery({id:id, status: activeTab});
  console.log(activeTab);

  // Update jobs when new data arrives - FIXED
  useEffect(() => {
    // Only update if we have new jobs data
    if (
      guardianPostedJobs?.data?.jobs &&
      guardianPostedJobs.data.jobs.length > 0
    ) {
      if (skip === 0) {
        // Reset jobs completely for new searches/filters
        setJobs(guardianPostedJobs.data.jobs);
      } else {
        // For pagination, append only new unique jobs
        setJobs((prev) => {
          const existingIds = new Set(prev.map((job) => job._id));
          const newJobs = guardianPostedJobs.data.jobs.filter(
            (job: any) => !existingIds.has(job._id)
          );
          return newJobs.length > 0 ? [...prev, ...newJobs] : prev;
        });
      }
    } else if (skip === 0) {
      // If no jobs returned and skip is 0, clear the jobs
      setJobs([]);
    }
  }, [guardianPostedJobs?.data?.jobs, skip]);

  // Infinite Scroll Observer - FIXED DEPENDENCIES
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetching &&
          guardianPostedJobs?.data?.meta?.hasMore
        ) {
          setSkip((prev) => prev + limit);
        }
      },
      { threshold: 1 }
    );

    const node = loaderRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [guardianPostedJobs?.data?.meta?.hasMore, isFetching]);

  const jobTabs = [
    {
      id: 1,
      key: "",
      title: "All Jobs",
      icon: <FiSend />,
    },
    {
      id: 2,
      key: "pending",
      title: "Pending Jobs",
      icon: <FiCornerUpLeft />,
    },
    {
      id: 3,
      key: "live",
      title: "Live Jobs",
      icon: <FiStar />,
    },
    {
      id: 5,
      key: "closed",
      title: "Confirmed Jobs",
      icon: <FiCheckCircle />,
    },
    {
      id: 6,
      key: "cancelled",
      title: "Cancelled Jobs",
      icon: <FiXCircle />,
    },
  ];
  return (
    <div className="font-Nunito">
      {/* Tabs Bar */}
      <div className="border-b border-blue-300 sticky top-0 z-15 bg-[#F2F5FC] px-3 lg:px-6 pt-6 pb-2">
        <div className="flex w-full overflow-x-auto overflow-y-hidden gap-6 md:gap-10">
          {jobTabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab?.(tab.key)}
                className={`
                              relative py-3 text-xs md:text-sm lg:text-base flex items-center gap-1 md:gap-2
                              font-medium transition-colors duration-200 cursor-pointer
                              ${
                                isActive
                                  ? "text-primary-10"
                                  : "text-slate-500 hover:text-primary-500"
                              }
                            `}
              >
                {/* Icon */}
                <span className="flex items-center justify-center">
                  {React.cloneElement(
                    tab.icon as React.ReactElement,
                    {
                      className: `size-3 md:size-4 ${
                        isActive ? "opacity-100" : "opacity-70"
                      }`,
                    } as any
                  )}
                </span>

                {/* Label + count */}
                <span className="whitespace-nowrap text-xs md:text-sm lg:text-base">
                  {tab.title}
                </span>

                {/* Active underline */}
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[3px] rounded-full bg-primary-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-3 lg:px-6 py-6">
        <Jobs
          allJobs={jobs}
          isLoading={isJobsLoading || isFetching}
          variant="admin"
        />
      </div>
      <div ref={loaderRef} className="h-10"></div>

      {guardianPostedJobs?.data?.meta?.hasMore && isFetching && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      )}
      {!guardianPostedJobs?.data?.meta?.hasMore && !isFetching && (
        <p className="text-center mt-4 text-gray-400">No more jobs to load.</p>
      )}
    </div>
  );
};

export default GuardianPostedJobs;
