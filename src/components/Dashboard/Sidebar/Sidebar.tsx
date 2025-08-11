import { Link, useLocation } from "react-router-dom";
import UserProfilePhoto from "./UserProfilePhoto/UserProfilePhoto";
import { tutorDashboardLinks } from "../../../data/dashboardSidebarLinks";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="w-[313px]  bg-primary-10 p-5 font-Nunito">
      <UserProfilePhoto />

      <div className="flex flex-col gap-2 mt-14">
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
    </div>
  );
};

export default Sidebar;
