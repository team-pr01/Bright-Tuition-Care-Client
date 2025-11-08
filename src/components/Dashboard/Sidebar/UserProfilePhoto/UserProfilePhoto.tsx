import { useSelector } from "react-redux";
import { ICONS, IMAGES } from "../../../../assets";
import { formatDate } from "../../../../utils/formatDate";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";

const UserProfilePhoto = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;

  return (
    <div className="font-Nunito flex flex-col items-center justify-center">
      <div className="size-32 rounded-full relative">
        <div className="bg-white/40 rounded-full p-[2px] size-full">
          {!user ? (
            <div className="size-full rounded-full bg-white/20 animate-pulse" />
          ) : (
            <img
              src={user?.profilePicture || IMAGES.dummyAvatar}
              alt="Profile"
              className="size-full object-cover rounded-full"
            />
          )}
        </div>

        {user && user?.isVerified && (
          <div className="bg-green-500 shadow-2xl size-7 rounded-full flex items-center justify-center absolute right-3 bottom-1">
            <img src={ICONS.tickMark} alt="verified" />
          </div>
        )}
      </div>

      {/* NAME */}
      {!user ? (
        <div className="h-5 w-32 mt-3 rounded-md bg-white/20 animate-pulse" />
      ) : (
        <h1 className="text-white font-semibold text-center text-xl mt-2">
          {user?.name}
        </h1>
      )}

      {/* ROLE + ID + DATE */}
      {!user ? (
        <div className="h-4 w-48 mt-2 rounded-md bg-white/20 animate-pulse" />
      ) : (
        <h2 className="text-white text-xs text-center mt-2">
          {user?.role === "tutor"
            ? "Tutor"
            : user?.role === "guardian"
            ? "Guardian"
            : "Admin"}{" "}
          Id : {user?.roleBasedId} | Since {formatDate(user?.createdAt)}
        </h2>
      )}
    </div>
  );
};

export default UserProfilePhoto;
