import DashboardOverviewCard from "../../../../components/Dashboard/DashboardOverviewCard/DashboardOverviewCard";

const TutorDashboardHome = () => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-6">
        <DashboardOverviewCard
          title="Applied Jobs"
          value="5"
          textColor="text-primary-10"
          path="/dashboard/tutor/tutor-requests"
        />
      </div>
    </div>
  );
};

export default TutorDashboardHome;
