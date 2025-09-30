import { RxArrowTopRight } from "react-icons/rx";
import NotificationCard from "../../components/Admin/NotificationsManagementPage/NotificationCard/NotificationCard";
import { ICONS } from "../../assets";
import { Link } from "react-router-dom";

const NotificationsManagement = () => {
  return (
   <div className="font-Nunito flex flex-col gap-4">
     <div className="flex items-center justify-between border-b border-neutral-30/20 pb-3">
        <div className="relative w-full lg:w-[400px]">
          <input
            placeholder={"Search by user name..."}
            className={`w-full pl-8 pr-2 py-[10px] rounded-lg bg-white border border-primary-30 leading-[18px] focus:outline-none focus:border-primary-10 transition duration-300`}
          />
          <img
            src={ICONS.search}
            alt=""
            className="size-5 absolute top-3 bottom-0 left-2"
          />
        </div>

          <Link
            to="/dashboard/admin/send-notification"
            className={`bg-primary-10 hover:bg-primary-20 hover:text-primary-10 transition duration-300 font-semibold text-white rounded-lg flex items-center gap-2 px-3 py-2 pointer`}
          >
            Send Notification <RxArrowTopRight className="text-lg" />
          </Link>
      </div>
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((notification) => (
        <NotificationCard />
      ))}
    </div>
   </div>
  );
};

export default NotificationsManagement;
