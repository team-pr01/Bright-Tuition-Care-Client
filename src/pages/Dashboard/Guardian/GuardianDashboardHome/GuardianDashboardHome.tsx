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
import LogoLoader from "../../../../components/Reusable/LogoLoader/LogoLoader";
import TutorOrGuardianOfTheMonth from "../../../../components/Dashboard/TutorOrGuardianOfTheMonth/TutorOrGuardianOfTheMonth";
const GuardianDashboardHome = () => {
  const { data, isLoading } = useGetGuardianDashboardStatsQuery({});
  const guardianStats = data?.data || {};
  const applications = guardianStats?.jobs || {};

  const formatCount = (value?: number) => String(value ?? 0).padStart(2, "0");

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const progress = guardianStats?.profileCompleted || 0;

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-Nunito">
        <LogoLoader />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 md:gap-0 font-Nunito">
      <div className="flex items-center overflow-x-auto w-full gap-3 md:gap-6 bg-primary-10 md:bg-[#F2F5FC] py-5 px-3 lg:px-6 rounded-b-3xl md:rounded-b-none">
        <DashboardOverviewCard
          title="All"
          additionalTitle="Jobs"
          value={formatCount(applications?.total)}
          textColor="text-white md:text-neutral-10"
          path="/dashboard/guardian/posted-jobs"
          icon={<FaLayerGroup />}
        />

        <DashboardOverviewCard
          title="Pending"
          additionalTitle="Jobs"
          value={formatCount(applications?.pending)}
          textColor="text-white md:text-neutral-10"
          path="/dashboard/guardian/posted-jobs?jobStatus=pending"
          icon={<FaHourglassHalf />}
        />

        <DashboardOverviewCard
          title="Live"
          additionalTitle="Jobs"
          value={formatCount(applications?.live)}
          textColor="text-white md:text-primary-10"
          path="/dashboard/guardian/posted-jobs?jobStatus=live"
          icon={<FaRegDotCircle />}
        />

        <DashboardOverviewCard
          title="Confirmed"
          value={formatCount(applications?.closed)}
          textColor="text-white md:text-green-500"
          path="/dashboard/guardian/posted-jobs?jobStatus=confirmed"
          icon={<FaCheckCircle />}
        />

        <DashboardOverviewCard
          title="Cancelled"
          value={formatCount(applications?.cancelled)}
          textColor="text-white md:text-rose-500"
          path="/dashboard/guardian/posted-jobs?jobStatus=cancelled"
          icon={<FaTimesCircle />}
        />
      </div>

      <div className="px-3 lg:px-6 flex flex-col gap-4 lg:gap-7">
        <NoticeBoard notices={guardianStats?.notices} />
        <div className="mt-2 bg-white border-l-4 border-blue-400 p-3 rounded text-gray-800 w-full">
          Need support with submitting your tutor request? Please call us at{" "}
          <a href="tel:0160785588" className="text-primary-10 underline">
            0160785588
          </a>{" "}
          (9:00 AM - 10:00 PM)
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          <TutorOrGuardianOfTheMonth
            variant="guardian"
            user={guardianStats?.guardianOfTheMonth || {}}
            userId={guardianStats?.guardianOfTheMonth?.guardianId}
          />
          <DashboardDataCard
            title={"Looking for a tutor?"}
            description={
              "Submit your requirements to find expert and verified tutors."
            }
            icon={ICONS.hire}
            value={""}
            titleColor={"text-primary-10"}
            valueColor={"text-primary-10"}
            btnLabel={"Submit Now"}
            path={"/dashboard/guardian/hire-a-tutor"}
            tips="To hire best tutor please share as much details as possible while posting the job."
          />
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
            badgeText={
              guardianStats?.hasPostedAnyJob && !guardianStats?.isVerified
                ? "Recommended"
                : null
            }
            path={"/dashboard/guardian/settings"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-primary-40/10 p-5 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6">
            {/* Progress Circle */}
            <div className="relative size-32 flex-shrink-0">
              <svg viewBox="0 0 128 128" className="size-full -rotate-90">
                {/* Background fill */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  fill="currentColor"
                  className="text-neutral-100"
                />

                {/* Track */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-gray-200"
                />

                {/* Progress */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress / 100)}
                  className="text-primary-10 transition-all duration-700 ease-out"
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
            <div className="flex-1">
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
                className="inline-block bg-gradient-to-r from-cyan-500 to-primary-10 text-white text-sm py-2 px-4 rounded-md mt-5"
              >
                {guardianStats?.profileCompleted === 100
                  ? "Profile Completed"
                  : "Complete Profile"}
              </Link>
            </div>
          </div>

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

        <SupportBar />
      </div>
    </div>
  );
};

export default GuardianDashboardHome;
