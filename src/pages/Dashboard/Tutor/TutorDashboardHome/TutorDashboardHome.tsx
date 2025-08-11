import DashboardOverviewCard from "../../../../components/Dashboard/DashboardOverviewCard/DashboardOverviewCard";
import NoticeBoard from "../../../../components/Dashboard/NoticeBoard/NoticeBoard";

const TutorDashboardHome = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-5 gap-6">
        <DashboardOverviewCard
          title="Applied Jobs"
          value="5"
          textColor="text-primary-10"
          path="/dashboard/tutor/tutor-requests"
        />
      </div>
      <NoticeBoard/>
    </div>
  );
};

export default TutorDashboardHome;
