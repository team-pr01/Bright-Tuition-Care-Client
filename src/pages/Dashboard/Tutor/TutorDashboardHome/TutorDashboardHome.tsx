import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../../../assets";
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

const TutorDashboardHome = () => {
  return (
    <div className="flex flex-col gap-4 lg:gap-9 font-Nunito">
      <div className="flex items-center overflow-x-auto w-full gap-3 md:gap-6">
        <DashboardOverviewCard
          title="Applied"
          additionalTitle="Jobs"
          value="7"
          textColor="text-neutral-10"
          path="/dashboard/tutor/job-applications/applied"
          icon={<FaBriefcase />}
        />
        <DashboardOverviewCard
          title="Shortlisted"
          additionalTitle="Jobs"
          value="5"
          textColor="text-primary-10"
          path="/dashboard/tutor/job-applications/shortlisted"
          icon={<FaClipboardCheck />}
        />
        <DashboardOverviewCard
          title="Appointed"
          value="2"
          textColor="text-[#9C9700]"
          path="/dashboard/tutor/job-applications/appointed"
          icon={<FaUserCheck />}
        />
        <DashboardOverviewCard
          title="Confirmed"
          value="1"
          textColor="text-green-500"
          path="/dashboard/tutor/job-applications/confirmed"
          icon={<FaCheckCircle />}
        />
        <DashboardOverviewCard
          title="Cancelled"
          value="6"
          textColor="text-rose-500"
          path="/dashboard/tutor/job-applications/cancelled"
          icon={<FaTimesCircle />}
        />
      </div>

      <NoticeBoard />
      {/* bg-gradient-to-r from-slate-50 to-sky-50 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-primary-40/10 p-5 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6">
          <div className="size-32 bg-white/40 rounded-full p-[2px]">
            <img
              src={IMAGES.dummyAvatar}
              alt=""
              className="size-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1
              className={`text-xl lg:text-[28px] font-semibold text-primary-10`}
            >
              Profile Completed{" "}
              <span
                className={`text-2xl md:text-[33px] font-bold text-primary-10`}
              >
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
          title={"Confirmation Letters"}
          description={"Because you have not confirmed any tuition job"}
          icon={ICONS.confirmationLetter}
          value={"2"}
          titleColor={"text-primary-10"}
          valueColor={"text-primary-10"}
          btnLabel={"Confirm Now"}
          path={""}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <DashboardDataCard
          title={"Nearby Jobs"}
          description={"Because you have not confirmed any tuition job"}
          icon={ICONS.animatedLocation}
          value={"35+"}
          titleColor={"text-primary-10/80"}
          valueColor={"text-primary-10"}
          btnLabel={"View Details"}
          path={""}
        />
        <DashboardDataCard
          title={"Invoice"}
          description={"Because you have not confirmed any tuition job"}
          icon={ICONS.invoice}
          value={"3"}
          titleColor={"text-primary-10/80"}
          valueColor={"text-primary-10"}
          btnLabel={"Pay Now"}
          path={""}
        />
      </div>

      <SupportBar />
    </div>
  );
};

export default TutorDashboardHome;
