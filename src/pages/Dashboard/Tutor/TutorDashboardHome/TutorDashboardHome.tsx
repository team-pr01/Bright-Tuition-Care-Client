import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../../../assets";
import DashboardDataCard from "../../../../components/Dashboard/DashboardDataCard/DashboardDataCard";
import DashboardOverviewCard from "../../../../components/Dashboard/DashboardOverviewCard/DashboardOverviewCard";
import NoticeBoard from "../../../../components/Dashboard/NoticeBoard/NoticeBoard";

const TutorDashboardHome = () => {
  return (
    <div className="flex flex-col gap-9 font-Nunito">
      <div className="grid grid-cols-5 gap-6">
        <DashboardOverviewCard
          title="Applied Jobs"
          value="5"
          textColor="text-primary-10"
          path="/dashboard/tutor/tutor-requests"
        />
        <DashboardOverviewCard
          title="Applied Jobs"
          value="5"
          textColor="text-primary-10"
          path="/dashboard/tutor/tutor-requests"
        />
        <DashboardOverviewCard
          title="Applied Jobs"
          value="5"
          textColor="text-primary-10"
          path="/dashboard/tutor/tutor-requests"
        />
        <DashboardOverviewCard
          title="Applied Jobs"
          value="5"
          textColor="text-primary-10"
          path="/dashboard/tutor/tutor-requests"
        />
        <DashboardOverviewCard
          title="Applied Jobs"
          value="5"
          textColor="text-primary-10"
          path="/dashboard/tutor/tutor-requests"
        />
      </div>
      <NoticeBoard />
{/* bg-gradient-to-r from-slate-50 to-sky-50 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-primary-40/10 p-5 flex gap-6">
          <div className="size-32 bg-white/40 rounded-full p-[2px]">
            <img
              src={IMAGES.dummyAvatar}
              alt=""
              className="size-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className={`text-[28px] font-semibold text-primary-10`}>
              Profile Completed{" "}
              <span className={`text-[33px] font-bold text-primary-10`}>
                50%
              </span>
            </h1>
            <p className="mb-8">
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

      <div className="grid grid-cols-3 gap-6">
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

       <div className="bg-primary-10 px-4 py-2 rounded-xl w-full flex items-center justify-between">
        <img src={ICONS.support} alt="" className="size-10" />
        <a href="tel: +880 1616-012365" className={`text-white text-xl font-bold leading-6 flex items-center gap-2`}>
          +880 1616-012365 <span className="text-sm font-normal">(10:00 AM - 10:00PM)</span>
        </a>
        <img src={ICONS.sendWhite} alt="" className="size-12 animate-pulse" />
      </div>
    </div>
  );
};

export default TutorDashboardHome;
