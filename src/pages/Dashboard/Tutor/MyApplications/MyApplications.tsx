/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useGetMyApplicationsQuery } from "../../../../redux/Features/Tutor/tutorApi";
import { useParams } from "react-router-dom";
import JobCardSkeleton from "../../../../components/JobBoardPage/Jobs/JobCard/JobCardSkeleton";
import JobCard from "../../../../components/JobBoardPage/Jobs/JobCard/JobCard";

const MyApplications = () => {
  const { status } = useParams();
  const [skip, setSkip] = useState<number>(0);
  const limit = 20;
  const [statusFilter, setStatusFilter] = useState<string>(
    status ? status : ""
  );

  const { data, isLoading, isFetching } = useGetMyApplicationsQuery({
    skip,
    limit,
    status: statusFilter,
  });

  const [jobs, setJobs] = useState<any[]>([]);

  // Update jobs when new data arrives
  useEffect(() => {
    if (data?.data?.applications) {
      if (skip === 0) {
        setJobs(data?.data?.applications);
      } else {
        setJobs((prev) => {
          const newJobs = data?.data?.applications.filter(
            (job: any) => !prev.some((p) => p._id === job._id)
          );
          return [...prev, ...newJobs];
        });
      }
    }
  }, [data?.data?.applications]);

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
  }, [data, isFetching, data?.data?.meta?.hasMore]);
  // Infinite Scroll Observer
  const loaderRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between font-Nunito">
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
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-0 overflow-visible">
          {jobs?.map((application) => {
            return (
              <JobCard
                key={application._id}
                variant="tutorJobCard"
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

        {isLoading ||
          (isFetching && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ))}
        {!data?.data?.meta?.hasMore && !isFetching && (
          <p className="text-center mt-4 text-gray-400">
            No more jobs to load.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
