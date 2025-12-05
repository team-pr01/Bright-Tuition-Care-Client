import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import DashboardDataCard from "../../../../components/Dashboard/DashboardDataCard/DashboardDataCard";
import DashboardOverviewCard from "../../../../components/Dashboard/DashboardOverviewCard/DashboardOverviewCard";
import NoticeBoard from "../../../../components/Dashboard/NoticeBoard/NoticeBoard";
import SupportBar from "../../../../components/Dashboard/SupportBar/SupportBar";
import {
  FaBriefcase,
  FaClipboardCheck,
  FaUserCheck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useGetTutorDashboardStatsQuery } from "../../../../redux/Features/Tutor/tutorApi";

const TutorDashboardHome = () => {
  const { data } = useGetTutorDashboardStatsQuery({});
  const tutorStats = data?.data || {};
  const applications = tutorStats?.applications || {};
  console.log(tutorStats);

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const progress = tutorStats?.profileCompleted || 0;
  return (
    <div className="flex flex-col gap-4 md:gap-0 font-Nunito">
      <div className="flex items-center overflow-x-auto w-full gap-3 md:gap-6 bg-primary-10 md:bg-[#F2F5FC] py-5 px-3 lg:px-6 rounded-b-3xl md:rounded-b-none">
        <DashboardOverviewCard
          title="Applied"
          additionalTitle="Jobs"
          value={applications?.applied || 0}
          textColor="text-white md:text-neutral-10"
          path="/dashboard/tutor/my-applications/applied"
          icon={<FaBriefcase />}
        />
        <DashboardOverviewCard
          title="Shortlisted"
          additionalTitle="Jobs"
          value={applications?.shortlisted || 0}
          textColor="text-white md:text-primary-10"
          path="/dashboard/tutor/my-applications/shortlisted"
          icon={<FaClipboardCheck />}
        />
        <DashboardOverviewCard
          title="Appointed"
          value={applications?.shortlisted || 0}
          textColor="text-white md:text-[#9C9700]"
          path="/dashboard/tutor/my-applications/appointed"
          icon={<FaUserCheck />}
        />
        <DashboardOverviewCard
          title="Confirmed"
          value={applications?.confirmed || 0}
          textColor="text-white md:text-green-500"
          path="/dashboard/tutor/my-applications/confirmed"
          icon={<FaCheckCircle />}
        />
        <DashboardOverviewCard
          title="Cancelled"
          value={applications?.cancelled || 0}
          textColor="text-white md:text-rose-500"
          path="/dashboard/tutor/my-applications/cancelled"
          icon={<FaTimesCircle />}
        />
      </div>

      <div className="px-3 lg:px-6 flex flex-col gap-4 lg:gap-7">
        <NoticeBoard notices={tutorStats?.notices} />
        {/* bg-gradient-to-r from-slate-50 to-sky-50 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  50%
                </span>
              </h1>
              <p className="mb-5 md:mb-8 text-sm md:text-base mt-2 md:mt-0">
                A complete and well organized profile can help you to get better
                response.
              </p>

              <Link
                to={"/dashboard/tutor/my-profile"}
                className="bg-gradient-to-r from-cyan-500 to-primary-10 text-white text-sm py-2 px-4 rounded-md mt-5"
              >
                {tutorStats?.profileCompleted ? "Profile Completed" : "Complete Profile"}
              </Link>
            </div>
          </div>

          <DashboardDataCard
            title={"Nearby Jobs"}
            description={"Check out your nearby tuition jobs."}
            icon={ICONS.animatedLocation}
            value={""}
            titleColor={"text-primary-10/80"}
            valueColor={"text-primary-10"}
            btnLabel={"View All"}
            path={`/dashboard/tutor/job-board?city=${tutorStats?.city}&area=${tutorStats?.area}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardDataCard
            title={"Status"}
            description={"Get better response by verifying your profile."}
            icon={
              tutorStats?.isVerified
                ? ICONS.profileVerified
                : ICONS.profileUnverified
            }
            value={tutorStats?.isVerified ? "Verified" : "Not Verified"}
            titleColor={"text-primary-10"}
            valueColor={"text-primary-10"}
            btnLabel={tutorStats?.isVerified ? "Verified" : "Verify Now"}
            path={"/dashboard/tutor/settings"}
          />

          <DashboardDataCard
            title={"Confirmation Letters"}
            description={"Because you have not confirmed any tuition job"}
            icon={ICONS.confirmationLetter}
            value={tutorStats?.confirmationLetterCount || 0}
            titleColor={"text-primary-10"}
            valueColor={"text-primary-10"}
            btnLabel={"View All"}
            path={"/dashboard/tutor/confirmation-letters"}
          />

          <DashboardDataCard
            title={"Invoice"}
            description={"Because you have not confirmed any tuition job"}
            icon={ICONS.invoice}
            value={tutorStats?.invoiceCount || 0}
            titleColor={"text-primary-10/80"}
            valueColor={"text-primary-10"}
            btnLabel={"View All"}
            path={"/dashboard/tutor/invoice"}
          />
        </div>

        <SupportBar />
      </div>
    </div>
  );
};

export default TutorDashboardHome;
