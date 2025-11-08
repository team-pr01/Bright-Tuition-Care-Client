import { Link, useLocation } from "react-router-dom";
import { adminDashboardLinks, guardianDashboardLinks, tutorDashboardLinks } from "../../../../data/dashboardSidebarLinks";

const RoleBasedNavlinks = () => {
    const location = useLocation();
      const navlinks = location.pathname.startsWith("/dashboard/tutor")
        ? tutorDashboardLinks
        : location.pathname.startsWith("/dashboard/guardian")
        ? guardianDashboardLinks
        : adminDashboardLinks;
    return (
        <div className="flex flex-col gap-2">
            {navlinks?.map((link) => (
              <Link
                key={link?.label}
                to={link?.path}
                className={`flex items-center gap-2 rounded-lg p-2 transform transition-transform duration-500 hover:-translate-y-1 ${
                  location?.pathname === link?.path
                    ? "bg-white text-primary-10 font-semibold"
                    : "font-medium  text-white  bg-none"
                }`}
              >
                <div className="size-6 rounded-full flex items-center justify-center bg-primary-10 text-white">
                  {link?.icon}
                </div>
                {link?.label}
              </Link>
            ))}
          </div>
    );
};

export default RoleBasedNavlinks;