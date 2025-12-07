import {
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaRegDotCircle,
  FaLayerGroup,
} from "react-icons/fa";
import DashboardOverviewCard from "../../../../components/Dashboard/DashboardOverviewCard/DashboardOverviewCard";
import NoticeBoard from "../../../../components/Dashboard/NoticeBoard/NoticeBoard";
import { Link } from "react-router-dom";
import DashboardDataCard from "../../../../components/Dashboard/DashboardDataCard/DashboardDataCard";
import { ICONS } from "../../../../assets";
import SupportBar from "../../../../components/Dashboard/SupportBar/SupportBar";
import { useGetGuardianDashboardStatsQuery } from "../../../../redux/Features/Guardian/guardianApi";
const GuardianDashboardHome = () => {
  const { data } = useGetGuardianDashboardStatsQuery({});
  const guardianStats = data?.data || {};
  const applications = guardianStats?.jobs || {};

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const progress = guardianStats?.profileCompleted || 0;
  return (
    <div className="flex flex-col gap-5 md:gap-0 font-Nunito">
      <div className="flex items-center overflow-x-auto w-full gap-3 md:gap-6 bg-primary-10 md:bg-[#F2F5FC] py-5 px-3 lg:px-6 rounded-b-3xl md:rounded-b-none">
        <DashboardOverviewCard
          title="All"
          additionalTitle="Jobs"
          value={applications?.total || 0}
          textColor="text-white md:text-neutral-10"
          path="/dashboard/guardian/posted-jobs"
          icon={<FaLayerGroup />}
        />
        <DashboardOverviewCard
          title="Pending"
          additionalTitle="Jobs"
          value={applications?.pending || 0}
          textColor="text-white md:text-neutral-10"
          path="/dashboard/guardian/posted-jobs?jobStatus=pending"
          icon={<FaHourglassHalf />}
        />

        <DashboardOverviewCard
          title="Live"
          additionalTitle="Jobs"
          value={applications?.live || 0}
          textColor="text-white md:text-primary-10"
          path="/dashboard/guardian/posted-jobs?jobStatus=live"
          icon={<FaRegDotCircle />}
        />
        <DashboardOverviewCard
          title="Confirmed"
          value={applications?.closed || 0}
          textColor="text-white md:text-green-500"
          path="/dashboard/guardian/posted-jobs?jobStatus=confirmed"
          icon={<FaCheckCircle />}
        />
        <DashboardOverviewCard
          title="Cancelled"
          value={applications?.cancelled || 0}
          textColor="text-white md:text-rose-500"
          path="/dashboard/guardian/posted-jobs?jobStatus=cancelled"
          icon={<FaTimesCircle />}
        />
      </div>

      <div className="px-3 lg:px-6 flex flex-col gap-4 lg:gap-7">
        <NoticeBoard notices={guardianStats?.notices} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardDataCard
            title={"Looking for a tutor?"}
            description={"Submit your requirements to find expert and verified tutors."}
            icon={ICONS.hire}
            value={""}
            titleColor={"text-primary-10"}
            valueColor={"text-primary-10"}
            btnLabel={"Submit Now"}
            path={"/dashboard/guardian/hire-a-tutor"}
          />
          <DashboardDataCard
            title={"Confirmation Letters"}
            description={
              guardianStats?.confirmationLetterCount === 0
                ? "You have not confirmed any tutors yet."
                : `You have successfully confirmed ${
                    guardianStats?.confirmationLetterCount
                  } tutor${
                    guardianStats?.confirmationLetterCount > 1 ? "s" : ""
                  }. Please click here to view and sign your confirmation letters to avoid any future complications.`
            }
            icon={ICONS.confirmationLetter}
            value={guardianStats?.confirmationLetterCount || 0}
            titleColor={"text-primary-10"}
            valueColor={"text-primary-10"}
            btnLabel={"View All"}
            path={"/dashboard/guardian/confirmation-letters"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-primary-40/10 p-5 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6">
            {/* Progress Circle */}
            <div className="relative size-32">
              <svg className="size-full transform -rotate-90">
                {/* Background fill */}
                <circle
                  fill="currentColor"
                  className="text-neutral-100"
                  r={radius}
                  cx="64"
                  cy="64"
                />

                {/* Track */}
                <circle
                  stroke="currentColor"
                  className="text-gray-200"
                  strokeWidth="6"
                  fill="transparent"
                  r={radius}
                  cx="64"
                  cy="64"
                />

                {/* Progress */}
                <circle
                  stroke="currentColor"
                  className="text-primary-10 transition-all duration-700 ease-out"
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  r={radius}
                  cx="64"
                  cy="64"
                />
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-10">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Text Section */}
            <div>
              <h1 className="text-xl lg:text-[28px] font-semibold text-primary-10">
                Profile Completed{" "}
                <span className="text-2xl md:text-[33px] font-bold text-primary-10">
                  {progress}%
                </span>
              </h1>
              <p className="mb-5 md:mb-8 text-sm md:text-base mt-2 md:mt-0">
                {progress === 100
                  ? "Your profile is now fully completed."
                  : "Complete your profile to become one of the most trusted members on the platform."}
              </p>

              <Link
                to={"/dashboard/guardian/my-profile"}
                className="bg-gradient-to-r from-cyan-500 to-primary-10 text-white text-sm py-2 px-4 rounded-md mt-5"
              >
                {guardianStats?.profileCompleted === 100
                  ? "Profile Completed"
                  : "Complete Profile"}
              </Link>
            </div>
          </div>
          <DashboardDataCard
            title={"Profile Status"}
            description={
              guardianStats?.isVerified
                ? "Your profile is verified."
                : "Submit a verification request to become a trusted member on the platform."
            }
            icon={
              guardianStats?.isVerified
                ? ICONS.profileVerified
                : ICONS.profileUnverified
            }
            value={guardianStats?.isVerified ? "Verified" : "Not Verified"}
            titleColor={"text-primary-10"}
            valueColor={"text-primary-10"}
            btnLabel={guardianStats?.isVerified ? "Verified" : "Verify Now"}
            path={"/dashboard/guardian/settings"}
          />
        </div>

        <SupportBar />
      </div>
    </div>
  );
};

export default GuardianDashboardHome;
