import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";

const JobCard = () => {
  const jobDetails = [
    {
      icon: ICONS.salary,
      tite: "Salary",
      value: "5000",
    },
    {
      icon: ICONS.subject,
      tite: "Subject",
      value: "All",
    },
    {
      icon: ICONS.tutoringDays,
      tite: "Tutoring Day’s",
      value: "3 Day’s / Week",
    },
    {
      icon: ICONS.preferredTutor,
      tite: "Prefer Tutor",
      value: "Female",
    },
    {
      icon: ICONS.tuitionType,
      tite: "Tuition Type",
      value: "Home Tutoring",
    },
    {
      icon: ICONS.location,
      tite: "Location",
      value: "Mohammodpur",
    },
  ];
  return (
    <div className="px-3 py-5 md:px-5 md:py-10 border border-primary-30 bg-white shadow-job-card rounded-xl font-Nunito transform transition-transform duration-300 hover:-translate-y-2">
      <h1 className="text-neutral-10 text-lg md:text-xl font-bold leading-6">
        Advanced Mathematics Tutor
      </h1>

      <div className="flex items-center gap-5 mt-3">
        <div className="flex items-center gap-[10px]">
          <img src={ICONS.jobId} alt="Posted-Date" className="size-5" />
          <p className="text-neutral-10 text-sm md:text-base leading-6">
            Jod Id#12345
          </p>
        </div>
        <div className="flex items-center gap-[10px]">
          <img src={ICONS.postedDate} alt="Posted-Date" className="size-5" />
          <p className="text-neutral-10 text-sm md:text-base leading-6">
            January 15, 2024
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-9 md:mt-12">
        <div className="grid grid-cols-2 gap-8">
          {jobDetails?.map((details, index) => (
            <div key={index} className="flex items-center gap-2">
              <img src={details?.icon} alt="" className="size-5" />
              <div>
                <p className="text-neutral-45 text-sm leading-normal">
                  {details?.tite}
                </p>
                <p className="text-neutral-10 font-medium leading-6 mt-1">
                  {details?.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <img
          src={ICONS.jobCategoryDummyIcon}
          alt=""
          className="size-20 md:size-[90px]"
        />
      </div>

      <div className="flex gap-4 mt-12 items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="bg-white hover:bg-primary-10/10 text-neutral-10 border border-primary-10 flex items-center gap-1 xl:gap-4 leading-[24px] w-fit rounded-lg font-semibold font-Nunito cursor-pointer transition-all duration-300 py-2 lg:py-3 px-3 xl:px-6 text-sm md:text-base">
            <img src={ICONS.jobDetails} alt="" className="size-5" />
            <p className="hidden md:block">Details</p>
          </button>
          <button className="bg-white hover:bg-primary-10/10 text-neutral-10 border border-primary-10 flex items-center gap-1 xl:gap-4 leading-[24px] w-fit rounded-lg font-semibold font-Nunito cursor-pointer transition-all duration-300 py-2 lg:py-3 px-3 xl:px-6 text-sm md:text-base">
            <img src={ICONS.share} alt="" className="size-5" />
            <p className="hidden md:block">Share</p>
          </button>
        </div>
        <Button
          label="Apply Now"
          variant="primary"
          icon={ICONS.topRightArrowWhite}
          iconBg="#0D99FF"
          className=""
        />
      </div>
    </div>
  );
};

export default JobCard;
