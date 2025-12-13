/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMarkAsReadMutation } from "../../../../redux/Features/Notification/notificationApi";
import { formatDate } from "../../../../utils/formatDate";

const NotificationCard = ({
  notification,
  setNotifications,
}: {
  notification: any;
  setNotifications: any;
}) => {
  const [markAsRead, { isLoading: isMarkingAsRead }] = useMarkAsReadMutation();

  // Function to mark a notification as read
  const handleNotificationClick = async (notificationId: string) => {
    try {
      await markAsRead(notificationId).unwrap();
      setNotifications((prev: any) =>
        prev.map((notification: any) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const title = notification?.title;

  const titleTextColor =
    title === "Viewed Your CV!"
      ? "#6B21A8"
      : title === "Shortlisted!"
      ? "#C2410C"
      : title === "Rejected!"
      ? "#fb2c36"
      : title === "Tuition Job Confirmed!"
      ? "#15803D"
      : title === "Cancelled!"
      ? "#fb2c36"
      : title === "Application Update"
      ? "#fb2c36"
      : "#364153";
  return (
    <div
      onClick={() => handleNotificationClick(notification?._id)}
      className={`py-3 px-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200 border-l-4 relative ${
        notification.isRead
          ? "border-l-transparent bg-gray-100/70"
          : "border-l-primary-10 bg-blue-50/30"
      } ${isMarkingAsRead ? "opacity-60" : ""}`}
    >
      {/* Loading Spinner */}
      {isMarkingAsRead && (
        <div className="absolute inset-0 bg-white/50 rounded-md flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-primary-10 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex justify-between items-start">
        <p
          className={`font-semibold text-sm`}
          style={{ color: titleTextColor }}
        >
          {notification?.title}
        </p>
        {!notification.isRead && !isMarkingAsRead && (
          <div className="w-2 h-2 bg-primary-10 rounded-full mt-1.5"></div>
        )}
      </div>
      <p className="text-sm text-gray-600 mt-1">{notification?.message}</p>
      <p className="text-xs text-gray-400 mt-2">
        {formatDate(notification?.createdAt)}
      </p>
    </div>
  );
};

export default NotificationCard;
