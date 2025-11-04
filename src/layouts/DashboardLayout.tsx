// DashboardLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  const location = useLocation();
  return (
    <div className="flex w-full h-screen bg-[#F2F5FC]">
      <Sidebar />
      <div className="flex flex-col w-full">
        <DashboardHeader />
        <div className={`flex-1 overflow-y-auto ${location.pathname.startsWith("/dashboard/tutor/home") || location.pathname.startsWith("/dashboard/guardian/home") ? "px-0 lg:px-0 py-0" : "px-3 lg:px-6 py-8"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
