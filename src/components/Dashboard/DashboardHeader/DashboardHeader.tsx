import DashboardHamburgerMenu from "../DashboardHamburgerMenu/DashboardHamburgerMenu";
import Notification from "./Notification/Notification";
import UserProfileDropdown from "./UserProfileDropdown/UserProfileDropdown";

const DashboardHeader = () => {
  return (
    <div className="px-3 lg:px-6 py-3 font-Nunito flex items-center justify-between sticky top-0 bg-white z-10 border-b border-neutral-50/40">
      <DashboardHamburgerMenu/>
      <div className="hidden lg:flex flex-col">
        <h1
          className={`text-2xl lg:text-[28px] font-semibold lg:font-bold text-neutral-10 leading-8 lg:leading-12`}
        >
          Dashboard
        </h1>
        <p className="text-neutral-45 text-sm md:text-base">
          Welcome back, John! Here's your tutoring overview.
        </p>
      </div>

      <div className="flex items-center gap-5">
        {/* Notification */}
        <Notification />

        {/* Profile Picture */}
       <UserProfileDropdown/>
      </div>
    </div>
  );
};

export default DashboardHeader;
