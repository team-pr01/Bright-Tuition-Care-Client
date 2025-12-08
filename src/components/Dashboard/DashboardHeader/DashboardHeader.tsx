import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";
import DashboardHamburgerMenu from "../DashboardHamburgerMenu/DashboardHamburgerMenu";
import Notification from "./Notification/Notification";
import UserProfileDropdown from "./UserProfileDropdown/UserProfileDropdown";

const DashboardHeader = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  return (
    <div className="px-3 lg:px-6 py-3 font-Nunito flex items-center justify-between sticky z-20 top-0 bg-white border-b border-neutral-50/40">
      <DashboardHamburgerMenu />
      <div className="hidden xl:flex flex-col">
        <h1
          className={`text-2xl lg:text-[28px] font-semibold lg:font-bold text-neutral-10 leading-8 lg:leading-12`}
        >
          Dashboard
        </h1>
        <p className="text-neutral-45 text-sm md:text-base">
          Welcome back, {user?.name}!
        </p>
      </div>

      <div className="flex items-center gap-5">
        {/* Notification */}

        {/* Profile Picture */}
        {user.role !== "admin" && user.role !== "staff" && <Notification />}
        {user && user.role !== "admin" && user.role !== "staff" && (
          <UserProfileDropdown user={user} />
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
