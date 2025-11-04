import { useParams } from "react-router-dom";
import { ICONS } from "../../../../assets";
import JobCard from "../../../../components/JobBoardPage/Jobs/JobCard/JobCard";

const JobApplicationsSummary = () => {
    const {status} = useParams();
  return (
    <div>
      <div className="flex items-center gap-3">
        <img src={ICONS.liveJobs} alt="" className="size-6" />
        <h1 className="text-xl md:text-2xl font-semibold leading-11 text-primary-50 capitalize">
          Total {status} Jobs : 5
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-7">
        <JobCard variant="status" detailsWidth="max-w-full" status={status} />
      </div>
    </div>
  );
};

export default JobApplicationsSummary;
