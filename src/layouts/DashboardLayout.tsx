import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <DashboardHeader />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
