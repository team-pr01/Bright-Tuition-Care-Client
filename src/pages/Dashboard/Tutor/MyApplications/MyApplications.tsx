/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useGetMyApplicationsQuery } from "../../../../redux/Features/Tutor/tutorApi";
import { useParams } from "react-router-dom";
import JobCardSkeleton from "../../../../components/JobBoardPage/Jobs/JobCard/JobCardSkeleton";
import JobCard from "../../../../components/JobBoardPage/Jobs/JobCard/JobCard";
import {
  FiUserCheck,
  FiSend,
  FiStar,
  FiCheckCircle,
  FiXCircle,
  FiCornerUpLeft,
} from "react-icons/fi";

const MyApplications = () => {
  const { status } = useParams();
  const [skip, setSkip] = useState<number>(0);
  const limit = 20;
  const [activeTab, setActiveTab] = useState<string>(
    status ? status : "applied"
  );

  const { data, isLoading, isFetching } = useGetMyApplicationsQuery({
    skip,
    limit,
    status: activeTab === "applied" ? "" : activeTab,
  });

  const [jobs, setJobs] = useState<any[]>([]);

  // reset pagination & data when tab changes
  useEffect(() => {
    setSkip(0);
    setJobs([]);
  }, [activeTab]);

  // Update jobs when new data arrives
  useEffect(() => {
    if (data?.data?.applications) {
      if (skip === 0) {
        setJobs(data.data.applications);
      } else {
        setJobs((prev) => {
          const newJobs = data.data.applications.filter(
            (job: any) => !prev.some((p) => p._id === job._id)
          );
          return [...prev, ...newJobs];
        });
      }
    }
  }, [data?.data?.applications, skip]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetching &&
          data?.data?.meta?.hasMore
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
  }, [data, isFetching, data?.data?.meta?.hasMore, activeTab]);

  // Infinite Scroll Observer
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const counts = data?.data?.meta?.counts || {};

  const jobTabs = [
    {
      id: 1,
      key: "applied",
      path: "/dashboard/tutor/my-applications/applied",
      title: "Applied Jobs",
      count: counts?.applied || 0,
      icon: <FiSend />,
    },
    {
      id: 2,
      key: "withdrawn",
      path: "/dashboard/tutor/my-applications/withdrawn",
      title: "Withdrawn Jobs",
      count: counts?.withdrawn || 0,
      icon: <FiCornerUpLeft />,
    },
    {
      id: 3,
      key: "shortlisted",
      path: "/dashboard/tutor/my-applications/shortlisted",
      title: "Shortlisted Jobs",
      count: counts?.shortlisted || 0,
      icon: <FiStar />,
    },
    {
      id: 4,
      key: "appointed",
      path: "/dashboard/tutor/my-applications/appointed",
      title: "Appointed Jobs",
      count: counts?.appointed || 0,
      icon: <FiUserCheck />,
    },
    {
      id: 5,
      key: "confirmed",
      path: "/dashboard/tutor/my-applications/confirmed",
      title: "Confirmed Jobs",
      count: counts?.confirmed || 0,
      icon: <FiCheckCircle />,
    },
    {
      id: 6,
      key: "cancelled",
      path: "/dashboard/tutor/my-applications/cancelled",
      title: "Cancelled Jobs",
      count: counts?.cancelled || 0,
      icon: <FiXCircle />,
    },
  ];

  return (
    <div>
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
                  {tab.title}{" "}
                  <span className={isActive ? "font-semibold" : "font-normal"}>
                    {String(tab.count).padStart(2, "0")}
                  </span>
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

      {/* <div className="flex items-center justify-between font-Nunito">
        <h1 className="text-xl md:text-2xl font-bold leading-11 text-primary-50">
          Applied Job{jobs?.length > 1 ? "s" : ""} :{" "}
          {jobs?.length < 10 ? 0 : ""}
          {jobs?.length}
        </h1>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input input-sm px-3 py-2 border border-neutral-55/60 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer"
        >
          <option value="">All Applications</option>
          <option value="applied">Applied</option>
          <option value="withdrawn">Withdrawn</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="appointed">Appointed</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div> */}

      <div className="px-3 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative overflow-visible">
          {jobs?.map((application) => {
            return (
              <JobCard
                key={application._id}
                variant="status"
                job={application?.job}
                status={application?.status}
                appliedData={{
                  _id: application?._id,
                  appliedOn: application?.appliedOn,
                }}
              />
            );
          })}
        </div>
        <div ref={loaderRef} className="h-10"></div>

        {(isLoading || isFetching) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!data?.data?.meta?.hasMore && !isFetching && (
          <p className="text-center mt-4 text-gray-400">No applications.</p>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
