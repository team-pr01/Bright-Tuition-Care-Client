import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  const location = useLocation();

  const pagesToAvoidForPadding = [
    "/dashboard/tutor/home",
    "/dashboard/guardian/home",
    "/dashboard/tutor/job-board",
    "/dashboard/tutor/my-applications/applied",
    "/dashboard/guardian/posted-jobs",
    "/dashboard/admin/all-jobs",
    "/dashboard/staff/all-jobs/all",
    "/dashboard/admin/lead-management",
    "/dashboard/admin/guardian/jobs/",
    "/dashboard/staff/guardian/",
    "/dashboard/admin/tutor/applications/"
  ];

  const shouldAvoidPadding = pagesToAvoidForPadding.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex w-full h-screen bg-[#F2F5FC]">
      <Sidebar />

      <div className="flex flex-col w-full">
        <DashboardHeader />

        <div
          className={`flex-1 overflow-y-auto ${
            shouldAvoidPadding ? "px-0 py-0" : "px-3 lg:px-6 py-6"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;