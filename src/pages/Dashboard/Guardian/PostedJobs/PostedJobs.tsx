/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import { useEffect, useRef, useState } from "react";
import { useGetMyPostedJobsQuery } from "../../../../redux/Features/Job/jobApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import { useDebounce } from "../../../../hooks/useDebounce";
import JobCardSkeleton from "../../../../components/JobBoardPage/Jobs/jobCard/JobCardSkeleton";
import Jobs from "../../../../components/JobBoardPage/Jobs/Jobs";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";

const PostedJobs = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [keyword, setKeyword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, 500);

  // Pagination states
  const [skip, setSkip] = useState(0);
  const limit = 6;
  const [jobs, setJobs] = useState<any[]>([]);

  // API Call
  const {
    data: allJobs,
    isLoading,
    isFetching,
  } = useGetMyPostedJobsQuery({
    keyword: debouncedKeyword || undefined,
    status: status || undefined,
    skip,
  });

  // Update jobs when new data arrives
  useEffect(() => {
    if (allJobs?.data?.jobs) {
      if (skip === 0) {
        setJobs(allJobs.data.jobs);
      } else {
        setJobs((prev) => {
          const newJobs = allJobs.data.jobs.filter(
            (job: any) => !prev.some((p) => p._id === job._id)
          );
          return [...prev, ...newJobs];
        });
      }
    }
  }, [allJobs, skip]);

  // Reset pagination when filters or search change
  useEffect(() => {
    setSkip(0);
    setJobs([]); // optional but better UX
  }, [debouncedKeyword, status]);

  // Infinite Scroll Observer
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetching &&
          allJobs?.data?.meta?.hasMore
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
  }, [allJobs, isFetching, allJobs?.data?.meta?.hasMore]);
  console.log(jobs, "jobs");

  return (
    <div className="font-Nunito">
      <div className="flex items-center justify-between border-b border-neutral-30/20 pb-3">
        <div className="relative w-full lg:w-[400px]">
          <input
            placeholder={"Search by job title or id..."}
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
            className={`w-full pl-8 pr-2 py-[10px] rounded-lg bg-white border border-primary-30 leading-[18px] focus:outline-none focus:border-primary-10 transition duration-300`}
          />
          <img
            src={ICONS.search}
            alt=""
            className="size-5 absolute top-3 bottom-0 left-2"
          />
        </div>
        <div className="flex items-center gap-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 bg-white border border-primary-30 rounded-lg cursor-pointer focus:outline-none focus:border-primary-30"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="live">Live</option>
          </select>

          <Link
            to="/dashboard/guardian/hire-a-tutor"
            className={`bg-primary-10 hover:bg-primary-20 hover:text-primary-10 transition duration-300 font-semibold text-white rounded-lg flex items-center gap-2 px-3 py-2 pointer`}
          >
            Hire a Tutor <RxArrowTopRight className="text-lg" />
          </Link>
        </div>
      </div>

      <div className="mt-5 ">
        <Jobs
          allJobs={jobs}
          isLoading={isLoading || isFetching}
          variant={user?.role === "admin" ? "admin" : "guardian"}
        />
      </div>
      <div ref={loaderRef} className="h-10"></div>

      {allJobs?.data?.meta?.hasMore && isFetching && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      )}
      {!allJobs?.data?.meta?.hasMore && !isFetching && (
        <p className="text-center mt-4 text-gray-400">No more jobs to load.</p>
      )}
    </div>
  );
};

export default PostedJobs;
