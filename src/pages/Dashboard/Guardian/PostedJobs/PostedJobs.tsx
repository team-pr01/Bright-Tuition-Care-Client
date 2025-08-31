import { RxArrowTopRight } from "react-icons/rx";
import JobCard from "../../../../components/JobBoardPage/Jobs/JobCard";
import { Link } from "react-router-dom";

const PostedJobs = () => {
  return (
    <div className="font-Nunito">
      <div className="flex items-center justify-between border-b border-neutral-30/20 pb-3">
        <div>
          <h1 className="font-bold text-xl text-neutral-10">All Posted Jobs</h1>
          <p className="text-sm mt-[6px] text-neutral-10">
            Find expert tutors easily for personalized learning and academic
            success.
          </p>
        </div>

        <Link
          to="/dashboard/guardian/hire-a-tutor"
          className={`bg-primary-10 hover:bg-primary-20 hover:text-primary-10 transition duration-300 font-semibold text-white rounded-xl flex items-center gap-2 px-5 py-3 cursor-pointer mt-5`}
        >
          Hire a Tutor <RxArrowTopRight className="text-lg mt-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-7">
        <JobCard
          variant="guardian"
          status="pending"
          detailsWidth="max-w-full"
        />
      </div>
    </div>
  );
};

export default PostedJobs;
