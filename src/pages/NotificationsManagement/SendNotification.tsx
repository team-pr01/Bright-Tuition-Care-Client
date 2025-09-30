import SendNotificationForm from "../../components/Admin/NotificationsManagementPage/SendNotificationForm/SendNotificationForm";

const SendNotification = () => {
  return (
    <div className="font-Nunito">
      <div className="bg-white border border-primary-10/30 rounded-2xl p-5 lg:p-7 flex flex-col gap-6 max-w-[1000px] mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-xl text-neutral-10">
            Send Notification
          </h1>
          {/* <p className="text-sm mt-[6px] text-neutral-10">
            Find expert tutors easily for personalized learning and academic
            success.
          </p> */}
        </div>

        <SendNotificationForm />
      </div>
    </div>
  );
};

export default SendNotification;
