import { ICONS, IMAGES } from "../../../assets";

const DashboardHeader = () => {
  return (
    <div className="px-6 py-3 font-Nunito flex items-center justify-between">
      <div>
        <h1
          className={`text-2xl lg:text-[28px] 2xl:text-[36px] font-semibold lg:font-bold text-neutral-10 leading-8 lg:leading-12`}
        >
          Dashboard
        </h1>
        <p className="text-neutral-45 text-sm md:text-base xl:text-lg">
          Welcome back, John! Here's your tutoring overview.
        </p>
      </div>

      <div className="flex items-center gap-5">
        {/* Notification */}
        <div className="relative">
          <img
            src={ICONS.notification}
            alt="notification-icon"
            className="size-8"
          />
          <div className="bg-gradient-to-r from-rose-400 to-red-500 size-4 rounded-full flex items-center justify-center text-xs text-white absolute -top-0 right-0">
            1
          </div>
        </div>

        {/* profile */}
        {/* Profile Image */}
        <div className="size-9 rounded-full bg-primary-10 flex items-center justify-center p-[2px] shadow-md">
          <div className="p-[2px] bg-white rounded-full w-full h-full">
            <img
              src={IMAGES.dummyAvatar}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
