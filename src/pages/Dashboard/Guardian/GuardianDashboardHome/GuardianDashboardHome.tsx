import {
  FaUserCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaRegDotCircle,
} from "react-icons/fa";
import DashboardOverviewCard from "../../../../components/Dashboard/DashboardOverviewCard/DashboardOverviewCard";
import NoticeBoard from "../../../../components/Dashboard/NoticeBoard/NoticeBoard";
import { Link } from "react-router-dom";
import DashboardDataCard from "../../../../components/Dashboard/DashboardDataCard/DashboardDataCard";
import { ICONS } from "../../../../assets";
import SupportBar from "../../../../components/Dashboard/SupportBar/SupportBar";
const GuardianDashboardHome = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-0 font-Nunito">
      <div className="flex items-center overflow-x-auto w-full gap-3 md:gap-6 bg-primary-10 md:bg-[#F2F5FC] py-5 px-3 lg:px-6">
        <DashboardOverviewCard
          title="Pending"
          additionalTitle="Jobs"
          value="7"
          textColor="text-white md:text-neutral-10"
          path="/dashboard/tutor/job-applications/pending"
          icon={<FaHourglassHalf />}
        />

        <DashboardOverviewCard
          title="Live"
          additionalTitle="Jobs"
          value="5"
          textColor="text-white md:text-primary-10"
          path="/dashboard/tutor/job-applications/live"
          icon={<FaRegDotCircle />}
        />
        <DashboardOverviewCard
          title="Appointed"
          value="2"
          textColor="text-white md:text-[#9C9700]"
          path="/dashboard/tutor/job-applications/appointed"
          icon={<FaUserCheck />}
        />
        <DashboardOverviewCard
          title="Confirmed"
          value="1"
          textColor="text-white md:text-green-500"
          path="/dashboard/tutor/job-applications/confirmed"
          icon={<FaCheckCircle />}
        />
        <DashboardOverviewCard
          title="Cancelled"
          value="6"
          textColor="text-white md:text-rose-500"
          path="/dashboard/tutor/job-applications/cancelled"
          icon={<FaTimesCircle />}
        />
      </div>

      <div className="px-3 lg:px-6 flex flex-col gap-4 lg:gap-7">
        <NoticeBoard />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardDataCard
            title={"Hire A Tutor"}
            description={"Find expert tutors online for personalized learning"}
            icon={ICONS.hire}
            value={""}
            titleColor={"text-primary-10"}
            valueColor={"text-primary-10"}
            btnLabel={"Hire Now"}
            path={""}
          />
          <DashboardDataCard
            title={"Confirmation Letters"}
            description={"Because you have not confirmed any tuition job"}
            icon={ICONS.confirmationLetter}
            value={"2"}
            titleColor={"text-primary-10"}
            valueColor={"text-primary-10"}
            btnLabel={"Confirm Now"}
            path={"/dashboard/guardian/confirmation-letters"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-primary-40/10 p-5 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6">
            {/* Progress Circle */}
            <div className="relative size-32">
              <svg className="size-full transform -rotate-90">
                {/* Background Fill */}
                <circle
                  className="text-neutral-100"
                  fill="currentColor"
                  r="58"
                  cx="64"
                  cy="64"
                />

                {/* Track */}
                <circle
                  className="text-gray-200"
                  strokeWidth="6"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />

                {/* Progress */}
                <circle
                  className="text-primary-10"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 58}
                  strokeDashoffset={2 * Math.PI * 58 * (1 - 0.5)} // 50%
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-10">50%</span>
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
                to={""}
                className="bg-gradient-to-r from-cyan-500 to-primary-10 text-white text-sm py-2 px-4 rounded-md mt-5"
              >
                Complete Profile
              </Link>
            </div>
          </div>
          <DashboardDataCard
            title={"Profile Status"}
            description={"Get better response by verifying your profile."}
            icon={ICONS.profileUnverified}
            value={"Not"}
            titleColor={"text-primary-10"}
            valueColor={"text-primary-10"}
            btnLabel={"Verify Now"}
            path={""}
          />
        </div>

        <SupportBar />
      </div>
    </div>
  );
};

export default GuardianDashboardHome;
