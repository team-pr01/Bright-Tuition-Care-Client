import { Link, useLocation } from "react-router-dom";
import UserProfilePhoto from "./UserProfilePhoto/UserProfilePhoto";
import {
  otherLinks,
  tutorDashboardLinks,
} from "../../../data/dashboardSidebarLinks";
import { TbLogout2 } from "react-icons/tb";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sticky top-0 left-0">
      <div className="w-[300px] bg-primary-10 p-5 font-Nunito flex flex-col gap-10 justify-between">
        <UserProfilePhoto />

        <div className="flex flex-col gap-4 h-full xl:h-[380px] 2xl:h-[600px] overflow-y-auto custom-scrollbar-sidebar">
          <div className="flex flex-col gap-2">
            {tutorDashboardLinks?.map((link) => (
              <Link
                key={link?.label}
                to={link?.path}
                className={`text-lg flex items-center gap-2 rounded-lg p-2 transform transition-transform duration-500 hover:-translate-y-1 ${
                  location?.pathname === link?.path
                    ? "bg-white text-primary-10 font-semibold"
                    : "font-medium  text-white  bg-none"
                }`}
              >
                {link?.icon}
                {link?.label}
              </Link>
            ))}
          </div>

          <hr className="border border-neutral-50/30" />
          <div className="flex flex-col gap-2">
            {otherLinks?.map((link) => (
              <Link
                key={link?.label}
                to={link?.path}
                className={`text-lg flex items-center gap-2 rounded-lg p-2 transform transition-transform duration-500 hover:-translate-y-1 ${
                  location?.pathname === link?.path
                    ? "bg-white text-primary-10 font-semibold"
                    : "font-medium  text-white  bg-none"
                }`}
              >
                {link?.icon}
                {link?.label}
              </Link>
            ))}
          </div>
        </div>

        <button
          className={`text-lg flex items-center gap-2 rounded-lg p-2 transform transition-transform duration-500 hover:-translate-y-1 text-white font-semibold cursor-pointer`}
        >
          <TbLogout2 className="text-xl" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
