import { RxArrowTopRight } from "react-icons/rx";
import JobCard from "../../../../components/JobBoardPage/Jobs/jobCard/JobCard";
import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import { useState } from "react";
import { useGetAllJobsQuery } from "../../../../redux/Features/Job/jobApi";

const PostedJobs = () => {
  const {data:allJobs, isLoading} = useGetAllJobsQuery({});
  console.log(allJobs);
  const role = "admin"
  const [status, setStatus] = useState<string>("");
  return (
    <div className="font-Nunito">
      <div className="flex items-center justify-between border-b border-neutral-30/20 pb-3">
        <div className="relative w-full lg:w-[400px]">
          <input
            placeholder={"Search by job title or id..."}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-7">
        <JobCard
          variant={role === "admin" ? "admin" : "guardian"}
          status="pending"
          detailsWidth="max-w-full"
        />
      </div>
    </div>
  );
};

export default PostedJobs;
