// DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden"> {/* Full height + hide page scroll */}
      <Sidebar />
      <div className="flex flex-col w-full">
        <DashboardHeader />
        <div className="flex-1 px-6 py-8 overflow-y-auto"> {/* Only outlet scrolls */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
