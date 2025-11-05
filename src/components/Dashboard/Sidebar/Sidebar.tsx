import { Link, useLocation, useNavigate } from "react-router-dom";
import UserProfilePhoto from "./UserProfilePhoto/UserProfilePhoto";
import {
  adminDashboardLinks,
  guardianDashboardLinks,
  otherLinks,
  tutorDashboardLinks,
} from "../../../data/dashboardSidebarLinks";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser, useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";
import { IMAGES } from "../../../assets";
import Cookies from "js-cookie";

const Sidebar = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const navlinks = location.pathname.startsWith("/dashboard/tutor")
    ? tutorDashboardLinks
    : location.pathname.startsWith("/dashboard/guardian")
    ? guardianDashboardLinks
    : adminDashboardLinks


    const handleLogout = async () => {
    dispatch(setUser({ user: null, token: null }));
    Cookies.remove("accessToken");
    Cookies.remove("role");
    dispatch(logout());
    localStorage.clear();
    navigate("/signin");
  };
  return (
    <div className="sticky top-0 left-0 hidden xl:block">
      <div className="w-[230px] 2xl:w-[270px] h-full bg-primary-10 p-5 font-Nunito flex flex-col gap-5 justify-between">
        {user?.role !== "admin" && <UserProfilePhoto />}
        {user?.role === "admin" || user?.role === "staff" ? (
          <img src={IMAGES.logoWhiteVertical} alt="" className="w-40 mx-auto" />
        ) : (
          ""
        )}
        <hr className="border border-neutral-50/30" />
        <div className="flex flex-col gap-4 h-full xl:h-[380px] 2xl:h-[600px] overflow-y-auto custom-scrollbar-sidebar">
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

          <hr className="border border-neutral-50/30" />
          <div className="flex flex-col gap-2">
            {otherLinks?.map((link) => (
              <Link
                key={link?.label}
                to={link?.path}
                className={`flex items-center gap-2 rounded-lg p-2 transform transition-transform duration-500 hover:-translate-y-1 ${
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
          onClick={handleLogout}
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
